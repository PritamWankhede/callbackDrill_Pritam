const {createDir,createFiles,deleteFiles} = require('../problem1');

let directory ='./Directory';
createDir(directory,(dir)=>{
    createFiles(directory,5,()=>{
        deleteFiles(directory,()=>{
            console.log("callback run sucessfully");
        })
    })
})