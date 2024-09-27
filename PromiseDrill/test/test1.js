const {createDirectory,filesInDirectory,deleteAllFiles} = require('../promise1');
let directory = '../newDirectory';
let nofiles = 5;

createDirectory(directory).then(()=>{
  return filesInDirectory(directory,nofiles);
}).then(()=>{
   return deleteAllFiles(directory);
}).then(()=>{
  console.log("All files deletedd sucessfully")
})   
.catch((error)=>{
    console.log(`Error in making file ${error}`);
});



