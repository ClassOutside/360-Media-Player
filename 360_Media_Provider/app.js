const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const app = express();
const { prepareData } = require("./Services/createTree.js");
const { streamVideo } = require("./Services/VideoService.js");
const {
  getFullResolutionImageFromPath,
} = require("./Services/ImageService.js");
const config = require("./application.json");
const path = require("path");

// Middleware: Enable CORS and JSON request body parsing, handle data preparation errors.
app.use(cors());
app.use(express.json());

// Load SSL/TLS certificate and set server configuration.
const privateKey = fs.readFileSync("./keys/server.key", "utf8");
const certificate = fs.readFileSync("./keys/server.cert", "utf8");
const credentials = { key: privateKey, cert: certificate };
const serverPort = config.port || 3000;
const defaultDirectoryPath = config.directoryPath || "./";
const httpsServer = https.createServer(credentials, app);

// Listen on the HTTPS port.
httpsServer.listen(serverPort, () => {
  console.log(`HTTPS Server is running on port ${serverPort}`);
});

app.get("/", (req, res) => res.json(res.locals.myData));

app.get("/streamVideo", (req, res) => {
  try {
    const videoPath = req.query.path;
    streamVideo(req, res, videoPath);
  } catch (error) {
    console.error(`Error streaming video: ${error.message}`);
    res.status(500).send("Error streaming video");
  }
});

app.get("/getDirectories", async (req, res) => {
  const pageNumber = req.query.pageNumber || 1;
  const subdirectory = req.query.subdirectory || "";

  console.log("Call to getDirectories for page: " + pageNumber);

  const selectedDirPath = defaultDirectoryPath + subdirectory;
  const preparedData = await prepareData(selectedDirPath, pageNumber);
  res.locals.myData = preparedData;
  res.json(res.locals.myData);
  console.log("Directories Returned");
});

app.get("/getFullResolutionImage", async (req, res) => {
  try {
    const imagePath = req.query.path;
    const fullResolutionImage = await getFullResolutionImageFromPath(imagePath);
    res.send(fullResolutionImage);
  } catch (error) {
    console.error(`Error getting full-resolution image: ${error.message}`);
    res.status(500).send("Error getting full-resolution image");
  }
});

app.get("/Fonts/:filename", (req, res) => {
  const { filename } = req.params;
  const allowedFiles = [
    "inter.json",
    "inter-bold.json",
    "inter.webp",
    "inter-bold.webp",
  ]; // Add more as needed
  if (allowedFiles.includes(filename)) {
    const filePath = path.join(__dirname, "Fonts", filename);
    console.log(filePath);
    res.sendFile(filePath);
  } else {
    res.status(404).send("File not found");
  }
});
