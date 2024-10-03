const {readFile,convertAndStroreFile,readConvertAndSplitFile,sortedFile,deletelistFiles} = require('../problem2'); 

readFile('../lipsum.txt',(data)=>{
    convertAndStroreFile(data,(newFile)=>{
         readConvertAndSplitFile(newFile,(newFileLowerCase)=>{
            sortedFile(newFileLowerCase,()=>{
                deletelistFiles('./filenames.txt',()=>{
                    console.log(`sucessfully run`);
                })
            })
         })
    })
  })
