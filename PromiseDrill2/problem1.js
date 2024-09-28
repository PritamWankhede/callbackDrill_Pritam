/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/
// const fs = require('fs/promises');
const fs = require('fs').promises;
const Path = require('path');

 function createDirectory(directory){  
   return new Promise((resolve,reject)=>fs.mkdir(directory).then(()=>{
    console.log(`Made file ${directory}`);
    resolve();
   }).catch((error)=>{
        console.log(`Error in file ${error}`);
        reject(error);
   }))
}

function filesInDirectory(directory,noFiles){
    let array=[];
 for(let index=1 ; index<= noFiles ; index++)
   {
     let filePath = `${directory}/test${index}.json`;
     let filePromise = new Promise((resolve,reject)=>fs.writeFile(filePath,`{${index}}`).then((data)=>{
       console.log("Files Created")
       resolve();
      })  
       .catch((error)=>{
         console.error(`Error in files creation ${error}`);
         reject(error);
       }))
   
     array.push(filePromise);
   }
   return Promise.all(array);
}

function deleteAllFiles(directory,noFiles){
   fs.readdir(directory,noFiles)
    .then((files)=>{
        console.log(`Directory read sucessfully ${directory}`);
   
    const deletePromises = files.map((file)=>{
        let filePath = Path.join(directory,file)
      return new Promise((resolve,reject)=>fs.unlink(filePath)
      .then(()=>
        {
          console.log(`Files deleted sucessfully`);
          resolve();
       })
     .catch((error)=>{
        console.error(`Error while deleting file ${index} ${error}`);
        reject(error);
     }));
   });
    return Promise.all(deletePromises);
  })
  .then(() => {
    console.log('All files deleted successfully.');
})
.catch(error => {
    console.error(`Error reading directory: ${error}`);
});
    
}
module.exports = {createDirectory,filesInDirectory,deleteAllFiles};   