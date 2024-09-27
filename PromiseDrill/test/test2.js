const {fileRead,convertTopperCase,fileTolowerCaseAndSplit,sortAndRewriteFile,deleteFilesFromList} = require('../Promise2');
let file = '../lipsum.txt';
let filenames = 'filenames.txt'
fileRead(file).then((data)=>{
   return convertTopperCase(data,filenames).then((newFileOfUpperCase)=>{
        return fileTolowerCaseAndSplit(newFileOfUpperCase,filenames)
        .then((newsplitedFile)=>{
           return sortAndRewriteFile(newsplitedFile,filenames)
           .then(()=>{deleteFilesFromList(filenames)})
        })
    })
}).catch((error)=>{
   console.error(`Error in file ${error}`)
});


