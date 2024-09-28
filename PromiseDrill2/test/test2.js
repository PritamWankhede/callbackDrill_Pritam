const {fileRead,convertToUpperCase,fileToLowerCaseAndSplit,sortAndRewriteFile,deleteFilesFromList} = require('../problem2');
let file = './lipsum.txt';
let filenames = 'filenames.txt'
fileRead(file).then((data)=>{
   return convertToUpperCase(data,filenames)
   .then((newFileOfUpperCase)=>
    {
      return fileToLowerCaseAndSplit(newFileOfUpperCase,filenames)
    .then((newsplitedFile)=>
    {
      return sortAndRewriteFile(newsplitedFile,filenames)
    .then(()=>{deleteFilesFromList(filenames)})
        })
    })
})
.catch((error)=>{
   console.error(`Error in file ${error}`)
});
