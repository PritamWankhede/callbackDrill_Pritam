/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/
// const fs = require('fs');
// const path = require('path');

// function creatingDir(directory, numOfFiles, callback) {
//     fs.mkdir(directory, { recursive: true }, (error) => {
//         if (error) {
//             console.error(`Error creating directory: ${error}`);
//             return; // Exit the function if there's an error
//         }
//         console.log(`Directory created: ${directory}`);
//         callback(directory, numOfFiles); // Call the callback only after the directory is created
//     });
// }

// function creatingFiles(directory, numOfFiles, callback) {
//     let filesCreated = 0;

//     for (let index = 0; index < numOfFiles; index++) {
//         fs.writeFile(`${directory}/test${index}.json`, '{}', (error) => {
//             if (error) {
//                 console.error(`Error creating file test${index}.json:`, error);
//             } else {
//                 console.log(`test${index}.json created successfully`);
//                 filesCreated++;

//                 // Call the callback once all files are created
//                 if (filesCreated === numOfFiles) {
//                     callback();
//                 }
//             }
//         });
//     }
// }

// function deleteDirectory(directory) {
//     fs.readdir(directory, (error, files) => {
//         if (error) {
//             console.log(`Error while reading directory: ${error}`);
//             return;
//         }

//         if (files.length === 0) {
//             console.log(`No files to delete in directory: ${directory}`);
//             return;
//         }

//         let filesDeleted = 0;

//         files.forEach(file => {
//             const filePath = path.join(directory, file);
//             fs.unlink(filePath, (error) => {
//                 if (error) {
//                     console.log(`Error deleting file: ${filePath}, ${error}`);
//                 } else {
//                     console.log(`File deleted: ${filePath}`);
//                     filesDeleted++;

//                     // Once all files are deleted, remove the directory
//                     if (filesDeleted === files.length) {
//                         fs.rmdir(directory, (error) => {
//                             if (error) {
//                                 console.log(`Error deleting directory: ${error}`);
//                             } else {
//                                 console.log(`Directory deleted: ${directory}`);
//                             }
//                         });
//                     }
//                 }
//             });
//         });
//     });
// }

// Example usage
// creatingDir('./Files', 5, (directory, numOfFiles) => {
//     creatingFiles(directory, numOfFiles, () => {
//         deleteDirectory(directory);
//     });
// });

// const fs = require('fs');
// const path = require('path');

//   function creatingDir(directory,numOfFiles,callback){
//     fs.mkdir(directory,function(error){
//         if(error){
//             return `Error creating directory, ${error}`;
//         }
//         else{
//             return `Directory Created, ${directory}`;
//         }
//     })
//     callback(directory, numOfFiles);
//   }
//   console.log(creatingDir('./Files',1,callbacks));

//  function creatingFiles(directory,numOfFiles,callback){
//     for(let index=0;index<numOfFiles;index++)
//     {
//         fs.writeFile(`${directory}/test${index}.json`, '{}', (error) => {
//             if (error) {
//                 console.error(`Error creating file test${index}.json:`, error);
//             } else {
//                 callback(`test${index}.json created successfully`);
//             }
//         });
//     }
//   }
//   console.log(creatingFiles('./Files',5,(message) => {
//     console.log(message)}));


// function deleteDirectory(directory) {
//     fs.readdir(directory, (error, files) => {
//         if (error) {
//             console.log(`Error while reading directory: ${error}`);
//             return;
//         }

//         if (files.length === 0) {
//             console.log(`No files to delete in directory: ${directory}`);
//             return;
//         }

//         files.forEach(file => {
//             const filePath = path.join(directory, file);
//             fs.unlink(filePath, (error) => {
//                 if (error) {
//                     console.log(`Error deleting file: ${filePath}, ${error}`);
//                 } else {
//                     console.log(`File deleted: ${filePath}`);
//                 }
//             });
//         });
//     });
// }


// creatingDir('./Files', 5, (directory, numOfFiles) => {
//     creatingFiles(directory, numOfFiles, () => {
//         deleteDirectory(directory);
//     });
// });



// const deleteFiles = () =>{
//     fs.readdir(dirPath, (err,files)=>{
//         if(err){
//             return console.error('Error reading directory:',err);
//         }
//         files.forEach(file=>{
//             const filePath = path.join(dirPath,file);
//             fs.unlink(filePath,(err)=>{
//                 if(err){
//                     return console.error('Error writing file : ',err);
//                 }
//                 console.log('File deleted: ',filePath);
//             })
//         })
//     }) 
// }
// setTimeout(deleteFiles, 2000);


//   const fs = require('fs');
//   const path = require('path');

//   const dirPath = './randomJsonFiles';

//   fs.mkdir(dirPath,{recursive:true},(err)=>{
//      if(err){
//         return console.error('Error creating directory',err);
//      }else{
//         console.log("Directory Created",dirPath);
//      }
//   })

//   const num = 5;
//   for(let i=1;i<=num;i++){
//     const filePath = path.join(dirPath, `file${i}.json`)
//     const randomData = {
//         id : 1,
//         name: `Random File ${i}`,
//        value: Math.random()
//     };

//     fs.writeFile(filePath,JSON.stringify(randomData,null,2),(err)=>{
//         if(err){
//             return console.error('Error writing file : ',err);
//         }
//         console.log('File created: ',filePath);
//     })
//   };
   
 const fs = require('fs');
 const path = require('path'); 
function makeDirectory(directory,noFiles,callback){
    fs.mkdir(directory,(error)=>{
        if(error){
            return `error in making file ${error}`
        }
        else{
            return `directory made sucessfully ${directory}`
        }
    })
    callback(directory,noFiles)
}

 function createFiles(directory,noFiles,callback){
    for(let index = 0 ;index<noFiles ;index++){
         fs.writeFile(`${directory}/test${index}.json`, '{}' , (error)=>{
            if(error){
                console.log(`error is there ${error}`)
            }
            else{
                callback(`test${index} is created`)
            }
         })
    }
 }
function deleteDirectory(directory) {
    fs.readdir(directory, (error, files) => {
        if (error) {
            console.log(`Error while reading directory: ${error}`);
            return;
        }

        if (files.length === 0) {
            console.log(`No files to delete in directory: ${directory}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);
            fs.unlink(filePath, (error) => {
                if (error) {
                    console.log(`Error deleting file: ${filePath}, ${error}`);
                } else {
                    console.log(`File deleted: ${filePath}`);
                }
            });
        });
    });
}


makeDirectory('./newdirectory', 1, (directory, noFiles) => {
    createFiles(directory, 5, (message) => {
        deleteDirectory(directory); 
    });
});
 

