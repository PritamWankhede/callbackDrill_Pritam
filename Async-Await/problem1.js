/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/
const fs =  require('fs/promises');

async function createDirectory(directory){
    try{
        await fs.mkdir(directory);
    }
    catch(error){
        console.log(Error);
    }
}


async function createFile(directory,noFiles){
  try{
         for(let index=1; index <= noFiles ; index++)
         { 
            let  path = `${directory}/test${index}.json`;   
            await fs.writeFile(path,'{}');
         }
    }
    catch(error){
        console.log(error);
    }
} 


async function deleteFiles(directory){
    try{
      let filesData =  await fs.readdir(directory);
        filesData.map((file)=>{
          let path = `${directory}/${file}`;
          console.log(path);
          fs.unlink(path);
       })
    } 
    catch{
        console.log(error);
    }
}


module.exports = {createDirectory,createFile,deleteFiles};