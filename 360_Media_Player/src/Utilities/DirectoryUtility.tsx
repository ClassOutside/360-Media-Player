export const arrayToDirectoryString = (subDirectoryArray: any) => {
    const arrayLength = subDirectoryArray.length
    switch (true) {
        case arrayLength === 0:
            return '';
        case arrayLength === 1:
            return '/' + subDirectoryArray[0];
        case arrayLength > 1:
            const directoryPath = '/' + subDirectoryArray.join('/');
            return directoryPath;
        default:
            return '';
    }
}