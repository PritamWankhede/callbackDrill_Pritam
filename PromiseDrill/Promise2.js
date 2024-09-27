/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/
const fs = require('fs/promises');

// 1. Read the given file lipsum.txt
function fileRead(file) {
    return fs.readFile(file, 'utf-8')
        .then(data => {
            console.log(`Data in file: ${data}`);
            return data;
        })
        .catch(error => {
            console.error(`Error in file: ${error}`);
            throw error;
        });
}

// 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
function convertTopperCase(data, filenames) {
    let newContent = data.toUpperCase();
    let newFileOfUpperCase = 'newFileOfUpperCase.txt';
    
    return fs.writeFile(newFileOfUpperCase, newContent)
        .then(() => {
            console.log('Converted to uppercase and wrote to file.');
            return fs.appendFile(filenames, newFileOfUpperCase + '\n');
        })
        .then(() => {
            return newFileOfUpperCase; // Pass the file name forward
        })
        .catch(error => {
            console.error(`Error: ${error}`);
            throw error;
        });
}

// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
function fileTolowerCaseAndSplit(newFileOfUpperCase, filenames) {
    return fs.readFile(newFileOfUpperCase, 'utf-8')
        .then(data => {
            let getDataInLowerCase = data.toLowerCase();
            let splitedData = getDataInLowerCase.split(" ").join("\n");
            let newsplitedFile = 'newsplitedFile.txt';

            return fs.writeFile(newsplitedFile, splitedData)
                .then(() => fs.appendFile(filenames, newsplitedFile + '\n'))
                .then(() => {
                    return newsplitedFile; // Pass the file name forward
                });
        })
        .catch(error => {
            console.error(`Error: ${error}`);
            throw error;
        });
}

// 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
function sortAndRewriteFile(newsplitedFile, filenames) {
    return fs.readFile(newsplitedFile, 'utf-8')
        .then(data => {
            let sortedContent = data.split('\n').sort((a, b) => a.localeCompare(b)).join('\n');
            let newSortedFile = 'newSortedFile.txt';

            return fs.writeFile(newSortedFile, sortedContent)
                .then(() => fs.appendFile(filenames, newSortedFile + '\n'))
                .then(() => {
                    console.log('Sorting and file writing completed.');
                });
        })
        .catch(error => {
            console.error(`Error in file: ${error}`);
            throw error;
        });
}

// 5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
function deleteFilesFromList(filenames) {
    return fs.readFile(filenames, 'utf-8')
        .then(fileList => {
            const files = fileList.split('\n').filter(Boolean);
            return Promise.all(files.map(file => fs.unlink(file)))
                .then(() => {
                    console.log('All files deleted successfully.');
                });
        })
        .catch(error => {
            console.error(`Error deleting files: ${error}`);
            throw error;
        });
}


module.exports = {fileRead,convertTopperCase,fileTolowerCaseAndSplit,sortAndRewriteFile,deleteFilesFromList};