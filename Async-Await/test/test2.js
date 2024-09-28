const {readFileData,convertToUpperCase,lowerCase,sortSplittedData,deleteFiles} = require('../problem2');

(async()=>{
    let txtFile = '../lipsum.txt' 
    let filenames = '../filenames.txt'
    let fileWithUpperCase = '../fileWithUpperCase.txt';
    let fileWithLowerCase = '../fileWithLowerCase.txt';
    let newSortedFile = '../sorteddFile.txt'
   await readFileData(txtFile);
   
   await convertToUpperCase(txtFile,filenames,fileWithUpperCase);
   await lowerCase(fileWithUpperCase,filenames,fileWithLowerCase);
   await sortSplittedData(fileWithLowerCase,filenames,newSortedFile);
   await deleteFiles(filenames);
})()
