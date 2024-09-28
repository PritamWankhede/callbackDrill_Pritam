const {createDirectory,createFile,deleteFiles} = require('../problem1');

(async()=>{
    const directory = '../directory'
const noFile = 5;

await createDirectory(directory)
await createFile(directory,noFile)
console.log("sussesfully created files")
await deleteFiles(directory)
console.log("sussesfully deleted files");
})()