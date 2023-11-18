const fs = require("fs").promises;
const path = require("path");
const ffmpeg = require("ffmpeg-static");
const { isImageFile, generateImageThumbnail } = require("./ImageService");
const {
  generateVideoThumbnail,
  isVideoFile,
  getVideoDuration,
} = require("./VideoService");
const { formatDate } = require("./DateService");

const itemsPerPage = 60;

const prepareData = async (dirPath, pageNumber = 1) => {
  const directoryItemList = [];
  let pageItemCounter = 0;
  let pageCountStart = (pageNumber - 1) * itemsPerPage; //page number 1 starts at 0, page number 2 starts at 60
  let pageCountLimit = pageNumber * itemsPerPage;

  try {
    const items = await fs.readdir(dirPath);
    for (const item of items) {
      let isItemOnPage = getIsItemOnPage(
        pageCountStart,
        pageItemCounter,
        pageCountLimit
      );
      let itemData = await getItemData(dirPath, item);
      let isValidItem = getIsValidItem(itemData);

      if (isItemOnPage === true && isValidItem === true) {
        directoryItemList.push(itemData);
      }
      if (isValidItem) {
        pageItemCounter++;
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}: ${error.message}`);
  }

  const pageCount = Math.ceil(pageItemCounter / itemsPerPage);

  return {
    directoryItemList: directoryItemList,
    pageCount: pageCount,
  };
};

const getIsItemOnPage = (pageCountStart, pageItemCounter, pageCountLimit) => {
  let isItemOnPage =
    pageCountStart <= pageItemCounter && pageItemCounter < pageCountLimit;
  return isItemOnPage;
};

const getIsValidItem = (itemData) => {
  const isValid =
    typeof itemData.isImage !== undefined &&
    typeof itemData.isVideo !== undefined &&
    typeof itemData.isFolder !== undefined &&
    (itemData.isImage === true ||
      itemData.isVideo === true ||
      itemData.isFolder === true);
  return isValid;
};

const getItemData = async (dirPath, item) => {
  const itemPath = path.join(dirPath, item);
  const itemMetadata = await fs.stat(itemPath);

  const isDirectory = itemMetadata.isDirectory();

  let itemData = setUniversalItemData(
    item,
    itemMetadata,
    isDirectory,
    itemPath
  );

  if (!isDirectory) {
    await setMediaItemData(itemData, item, itemPath);
  }

  return itemData;
};

const setUniversalItemData = (item, itemMetadata, isDirectory, itemPath) => {
  return {
    name: item,
    dateModified: formatDate(itemMetadata.mtime), // Use mtime for dateModified
    isFolder: isDirectory,
    path: itemPath,
  };
};

const setMediaItemData = async (itemData, item, itemPath) => {
  itemData.isImage = isImageFile(item);
  itemData.isVideo = isVideoFile(item);
  await generateThumbnailAndVideoDuration(itemData, itemPath);
};

const generateThumbnailAndVideoDuration = async (item, itemPath) => {
  if (item.isImage) {
    item.thumbnail = await generateImageThumbnail(itemPath);
  } else if (item.isVideo) {
    item.duration = await getVideoDuration(itemPath);
    item.thumbnail = await generateVideoThumbnail(itemPath);
  }
};

module.exports = {
  prepareData,
};
