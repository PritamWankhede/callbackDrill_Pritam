/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/
const fs = require('fs').promises;

// 1. Read the file
function fileRead(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8')
            .then(data => {
                console.log(`Data in file: ${data}`);
                resolve(data);
            })
            .catch(error => {
                console.error(`Error reading file: ${error}`);
                reject(error);
            });
    });
}

// 2. Convert the content to uppercase, write to a new file, and store the name in filenames.txt
function convertToUpperCase(data, filenames) {
    return new Promise((resolve, reject) => {
        const newContent = data.toUpperCase();
        const newFileOfUpperCase = 'newFileOfUpperCase.txt';

        fs.writeFile(newFileOfUpperCase, newContent)
            .then(() => {
                console.log('Converted to uppercase and wrote to file.');
                return fs.appendFile(filenames, newFileOfUpperCase + '\n');
            })
            .then(() => {
                resolve(newFileOfUpperCase);
            })
            .catch(error => {
                console.error(`Error: ${error}`);
                reject(error);
            });
    });
}

// 3. Convert the new file's content to lowercase, split into sentences, and write to a new file
function fileToLowerCaseAndSplit(newFileOfUpperCase, filenames) {
    return new Promise((resolve, reject) => {
        fs.readFile(newFileOfUpperCase, 'utf-8')
            .then(data => {
                const getDataInLowerCase = data.toLowerCase();
                const splitedData = getDataInLowerCase.split(" ").join("\n");
                const newsplitedFile = 'newsplitedFile.txt';

                return fs.writeFile(newsplitedFile, splitedData)
                    .then(() => fs.appendFile(filenames, newsplitedFile + '\n'))
                    .then(() => {
                        resolve(newsplitedFile);
                    });
            })
            .catch(error => {
                console.error(`Error: ${error}`);
                reject(error);
            });
    });
}

// 4. Sort the content of the file and write it to a new file
function sortAndRewriteFile(newsplitedFile, filenames) {
    return new Promise((resolve, reject) => {
        fs.readFile(newsplitedFile, 'utf-8')
            .then(data => {
                const sortedContent = data.split('\n').sort((a, b) => a.localeCompare(b)).join('\n');
                const newSortedFile = 'newSortedFile.txt';

                return fs.writeFile(newSortedFile, sortedContent)
                    .then(() => fs.appendFile(filenames, newSortedFile + '\n'))
                    .then(() => {
                        console.log('Sorting and file writing completed.');
                        resolve(newSortedFile);
                    });
            })
            .catch(error => {
                console.error(`Error: ${error}`);
                reject(error);
            });
    });
}

// 5. Delete all files listed in filenames.txt
function deleteFilesFromList(filenames) {
    return new Promise((resolve, reject) => {
        fs.readFile(filenames, 'utf-8')
            .then(fileList => {
                const files = fileList.split('\n').filter(Boolean);
                return Promise.all(files.map(file => fs.unlink(file)));
            })
            .then(() => {
                console.log('All files deleted successfully.');
                resolve();
            })
            .catch(error => {
                console.error(`Error deleting files: ${error}`);
                reject(error);
            });
    });
}


module.exports = {fileRead,convertToUpperCase,fileToLowerCaseAndSplit,sortAndRewriteFile,deleteFilesFromList};