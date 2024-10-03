/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/
const fs = require("fs").promises;
const path = require("path");

function main(dir) {
    const file = 'lipsum.txt';
    const filePath = path.join(dir, file);
    const fileNames = path.join(dir, 'fileNames.txt');

    fs.writeFile(filePath, 'This is file from  newfom')
        .then(() => upperCase(filePath, fileNames))
        .then(() => lowerCase(path.join(dir, 'file1.txt'), fileNames))
        .then(() => sortTheContent(path.join(dir, 'file2.txt'), fileNames))
        .then(() => deleteFiles(dir, fileNames))
        .then(() => console.log('All files processed and deleted'))
        .catch((error) => console.error('Error:', error));
}

function upperCase(file, fileNames) {
    let upperCaseFile; 
    return fs.readFile(file, 'utf-8')
        .then((data) => {
            console.log(data);
            const upperCaseContent = data.toUpperCase();
            upperCaseFile = 'file1.txt'; 
            return fs.writeFile(path.join(path.dirname(file), upperCaseFile), upperCaseContent);
        })
        .then(() => fs.appendFile(fileNames, upperCaseFile + '\n')); 
}

function lowerCase(file, fileNames) {
    let lowerCaseFile;
    return fs.readFile(file, 'utf-8')
        .then((data) => {
            console.log(data);
            const lowerCaseSentences = data.toLowerCase().split('.').filter(Boolean).join('. ');
            lowerCaseFile = 'file2.txt'; 
            return fs.writeFile(path.join(path.dirname(file), lowerCaseFile), lowerCaseSentences);
        })
        .then(() => fs.appendFile(fileNames, lowerCaseFile + '\n')); 
}

function sortTheContent(file, fileNames) {
    let sortedFile; 
    return fs.readFile(file, 'utf-8')
        .then((data) => {
            console.log(data);
            const sortedContent = data.split('.').filter(Boolean).sort().join('. ');
            console.log(sortedContent);
            sortedFile = 'file3.txt'; 
            return fs.writeFile(path.join(path.dirname(file), sortedFile), sortedContent);
        })
        .then(() => fs.appendFile(fileNames, sortedFile + '\n')); 
}

function deleteFiles(dir, fileNames) {
    return fs.readFile(fileNames, 'utf-8')
        .then((data) => {
            const files = data.split('\n').filter(Boolean).map(file => file.trim()); 
            const deletePromises = files.map((file) => fs.unlink(file)); 
            return Promise.all(deletePromises); 
        })
        .then(()=>fs.writeFile(fileNames,''));
}

module.exports = main;