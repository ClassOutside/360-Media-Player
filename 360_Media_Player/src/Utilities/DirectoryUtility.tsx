export const arrayToDirectoryString = (subDirectoryArray: any) => {
    const arrayLength = subDirectoryArray.length
    switch (arrayLength) {
        case 0:
            return ''
        case 1:
            return '/' + subDirectoryArray[0]
        case (arrayLength > 1):
            const directoryPath = '/' + subDirectoryArray.join('/');
            console.log(directoryPath)
            return directoryPath;
        default:
            return ''
    }
}