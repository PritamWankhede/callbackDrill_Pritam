const {makeDirectory,createFiles,deleteDirectory} = require('../problem1');

makeDirectory('./newdirectory',1,()=>{
    createFiles('./newdirectory',5,(message)=>{
        deleteDirectory(directory) ;
   });
});
 