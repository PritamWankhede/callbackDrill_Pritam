const {contentToUpperCase,contentToLowerCase,deleteFile} = require('../problem1');

let directory = './directory'
let noFiles = 5;
createDirectory(directory)
.then((directory)=>{return createFiles(directory,noFiles)})
.then((directory)=>{return deleteFiles(directory)})
.then(()=>{console.log("Files created sucssesfully")})
.catch((error)=>{console.error(error)});
