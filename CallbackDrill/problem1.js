/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/ 
 const fs = require('fs');
 const Path = require('path');
 
 function createDir(directory,callback){
     fs.mkdir(directory,(err)=>{
          if(err){
             console.log(`${err}`);
          }
          console.log('directory created');
          callback(directory);
     })
 }
 
 function createFiles(directory,nofiles,callback){
       for (let i = 0; i < nofiles; i++) {
         let files = `${directory}/test${i}.json`;
             fs.writeFile(files, '{}', (err) => {
                 if (err) {
                     console.error(`${err}`);
                     return; 
                 }
                 console.log(`File test${i}.json created`);
                     callback();  
             });
         }
     }
 
     function deleteFiles(directory) {
        fs.readdir(directory, 'utf-8', (err, data) => {
            if (err) {
                console.error(`${err}`);
                return;
            }
            console.log("Files read successfully");
    
            data.forEach((file) => {
                let filePath = Path.join(directory, file);
                if (fs.existsSync(filePath)) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`${err}`);
                            return;
                        }
                        console.log(`${file} deleted`);
                    });
                } else {
                    console.log(`File ${file} does not exist`);
                }
            });
        });
    }
    

module.exports = {createDir,createFiles,deleteFiles};

