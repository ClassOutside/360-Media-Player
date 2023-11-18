const fs = require("fs").promises;
const path = require("path");
const sharp = require("sharp");

const getFullResolutionImageFromPath = async (path) => {
  try {
    const imageBuffer = await fs.readFile(path);
    const base64Image = imageBuffer.toString("base64");
    return base64Image;
  } catch (error) {
    console.error(
      `Error getting full-resolution image from path: ${error.message}`
    );
    throw error;
  }
};

const isImageFile = (fileName) => {
  const imageExtensions = [".jpg", ".jpeg", ".png"];
  const extension = path.extname(fileName).toLowerCase();
  return imageExtensions.includes(extension);
};

const generateImageThumbnail = async (inputPath) => {
  try {
    const thumbnailBuffer = await sharp(inputPath).resize(100, 100).toBuffer();

    return thumbnailBuffer.toString("base64");
  } catch (error) {
    console.error(
      `Error generating thumbnail for ${inputPath}: ${error.message}`
    );
    return null;
  }
};

module.exports = {
  getFullResolutionImageFromPath,
  isImageFile,
  generateImageThumbnail,
};
