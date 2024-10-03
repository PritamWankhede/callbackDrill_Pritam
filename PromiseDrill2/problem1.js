/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require('fs');
const path= require('path')

function createDirectory(directory){
   return new Promise((resolve,reject)=>{
     fs.mkdir(directory,{recursive:true},(error)=>{
        if(error){
            return reject(error)
        }
        else{
            console.log("file created sucessfully");
            resolve(directory);
        }
     })
   })
}

function createFiles(directory,noFiles)
{
   return new Promise((resolve,reject)=>{
    let fileArray = [];
    for(let index=1;index<=noFiles;index++){
    
    let filePath = path.join(directory,`test${index}.json`);
     
    fileArray.push(
        new Promise((resolve,reject)=>{
          fs.writeFile(filePath,'',(error)=>{
              if(error)
                {
                    reject(error)
                }       
                else{
                   resolve("created files");
                }
           })
     }))  
  }
 Promise.all(fileArray)
   .then(()=>{resolve(directory)})
   .catch((error)=>{reject(error)})   
})}


function deleteFiles(directory){
    return new Promise((resolve,reject)=>{
      fs.readdir(directory,(error,files)=>{
         if(error){
            return reject(error);
         }
         else{
           let filesToDelete = files.map( ( file)=>{
             let filePath  = path.join(directory,file);

             return new Promise((resolve, reject) => {
              fs.unlink(filePath,(error)=>{
                if(error){
                  return reject(error)
                }
                else{
                    console.log(`${file} deleted sucessfully `)
                    return resolve()
                }
             })})
           })
             Promise.all(filesToDelete)
               .then(()=>resolve("Deleted Files"))
               .catch((error)=>reject(error));
         }})
    })}
module.exports = {createDirectory,createFiles,deleteFiles};   