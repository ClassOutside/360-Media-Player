const fs = require("fs");
const ffmpeg = require("ffmpeg-static");
const { exec } = require("child_process");
const path = require("path");
const os = require("os");

const isVideoFile = (fileName) => {
  const mp4Extensions = [".mp4"];
  const extension = path.extname(fileName).toLowerCase();
  return mp4Extensions.includes(extension);
};

function streamVideo(req, res, videoPath) {
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    file.pipe(res);
  } else {
    const headers = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, headers);
    fs.createReadStream(videoPath).pipe(res);
  }
}

const generateVideoThumbnail = async (inputPath) => {
  const isWindows = os.platform() === "win32";

  return new Promise((resolve, reject) => {
    const outputThumbnailPath = path.join(__dirname, "temp-thumbnail.jpg");
    const cmd = `"${ffmpeg}" -y -i "${inputPath}" -ss 0 -vframes 1 -vf "scale=100:100" -f image2 "${outputThumbnailPath}"`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(
          `Error generating video thumbnail for ${inputPath}: ${error.message}`
        );
        reject(error);
      } else {
        fs.readFile(outputThumbnailPath, (err, data) => {
          if (err) {
            console.error(`Error reading video thumbnail file: ${err.message}`);
            reject(err);
          } else {
            fs.unlink(outputThumbnailPath, (unlinkErr) => {
              if (unlinkErr) {
                console.error(
                  `Error deleting the temporary thumbnail file: ${unlinkErr.message}`
                );
              }
            });
            resolve(data.toString("base64"));
          }
        });
      }
    });
  });
};

const getVideoDuration = (videoPath) => {
  const isWindows = os.platform() === "win32";

  return new Promise((resolve, reject) => {
    const cmd = isWindows
      ? `"${ffmpeg}" -i "${videoPath}" 2>&1 | find "Duration"`
      : `"${ffmpeg}" -i "${videoPath}" 2>&1 | grep "Duration"`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(
          `Error getting video duration for ${videoPath}: ${error.message}`
        );
        reject(error);
      } else {
        const output = stdout.trim();
        if (output) {
          const durationMatch = /Duration: (\d+:\d+:\d+\.\d+)/.exec(output);
          if (durationMatch) {
            const durationString = durationMatch[1];
            const [hours, minutes, seconds] = durationString.split(":");
            const durationInSeconds =
              parseInt(hours) * 3600 +
              parseInt(minutes) * 60 +
              parseFloat(seconds);
            resolve(durationInSeconds);
          } else {
            resolve(null); // Video duration not found
          }
        } else {
          resolve(null); // Video duration not found
        }
      }
    });
  });
};

module.exports = {
  streamVideo,
  generateVideoThumbnail,
  isVideoFile,
  getVideoDuration,
};
