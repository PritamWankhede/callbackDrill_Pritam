/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/
const fs = require('fs').promises;
const Path = require('path');

// 1. Create a directory
function createDirectory(directory) {
    fs.mkdir(directory, (error) => {
        if (error) {
            console.error(`Error creating directory: ${error}`);
        } else {
            console.log(`Directory created: ${directory}`);
        }
    });
}

// 2. Create JSON files in the directory
function filesInDirectory(directory, noFiles) {
    let promises = [];
    for (let index = 1; index <= noFiles; index++) {
        let filePath = `${directory}/test${index}.json`;
        let filePromise = fs.writeFile(filePath, '{}', (error) => {
            if (error) {
                console.error(`Error creating file: ${filePath}, Error: ${error}`);
            } else {
                console.log(`File created: ${filePath}`);
            }
        });
        promises.push(filePromise);
    }
    Promise.all(promises).then(() => {
        // This block is not needed anymore, since we're replacing `then`
    }).catch((error) => {
        console.error(`Error in file creation: ${error}`);
    });
}

// 3. Delete all files in the directory
function deleteAllFiles(directory) {
    fs.readdir(directory, (error, files) => {
        if (error) {
            console.error(`Error reading directory: ${error}`);
        } else {
            console.log(`Directory read successfully: ${directory}`);
            const deletePromises = files.map((file) => {
                let filePath = Path.join(directory, file);
                return fs.unlink(filePath, (error) => {
                    if (error) {
                        console.error(`Error deleting file: ${filePath}, Error: ${error}`);
                    } else {
                        console.log(`File deleted: ${filePath}`);
                    }
                });
            });
            Promise.all(deletePromises).then(() => {
                console.log('All files deleted successfully.');
            }).catch((error) => {
                console.error(`Error in file deletion: ${error}`);
            });
        }
    });
}

module.exports = { createDirectory, filesInDirectory, deleteAllFiles };
