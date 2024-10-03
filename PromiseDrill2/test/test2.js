const {contentToUpperCase,contentToLowerCase,deleteFile} = require('../problem2');

let lipsumFile = './lipsum.txt'
let filenames = './filenames.txt'
contentToUpperCase(lipsumFile,filenames)
.then((upperCaseFIle)=>{return contentToLowerCase(upperCaseFIle,filenames)})
.then((filenames)=>{return deleteFile(filenames)})
.then(()=>{console.log("files deleted sucessfully")})
.catch((error)=>{error});