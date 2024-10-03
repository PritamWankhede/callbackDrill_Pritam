 /*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/
const { appendFile } = require('fs');
const fs = require('fs/promises')

async function readFileData(file){
    try{
         let result = await fs.readFile(file,'utf-8');
       //  console.log(result);
    }
    catch(error){
        console.log(error);
    }
}

// 2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
async function convertToUpperCase(file,filenames,fileWithUpperCase) {
    try {
        let contentInFile = await fs.readFile(file,'utf-8');
        let upperCase = contentInFile.toUpperCase();
        // console.log(upperCase);
        await fs.writeFile(fileWithUpperCase,upperCase);
        await fs.appendFile(filenames ,fileWithUpperCase + '\n');
    } catch (error) {
        console.log(error);
    }
}

// 3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
 async function lowerCase(fileWithUpperCase,filenames,fileWithLowerCase){
   try {
    let file = await fs.readFile(fileWithUpperCase,'utf-8');
    let contentInLowerCase = file.toLowerCase();
    let split = contentInLowerCase.split(" ").join('\n');
    await fs.writeFile(fileWithLowerCase,split);
    await fs.appendFile(filenames,fileWithLowerCase + '\n');
   } 
    catch (error) 
    {
       console.log(error);
    }
 }
 

 //4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
  async function sortSplittedData(fileWithLowerCase,filenames,newSortedFile){
    try {
      let data = await fs.readFile(fileWithLowerCase,'utf-8');
      let sortedData = data.split('\n').sort((a,b)=>a.localeCompare(b)).join('\n');
       await fs.writeFile(newSortedFile,sortedData);
       await fs.appendFile(filenames,newSortedFile+'\n');
    }
     catch (error) 
     {
        console.log(error);
     }
  }


//5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
  async function deleteFiles(filenames){
    try {
        let files = await fs.readFile(filenames,'utf-8');
        let filedata = files.split('\n').filter(Boolean);
        filedata.map(file => fs.unlink(file)) 
    } catch (error) {
        console.log(error);
    }
  }

module.exports = {readFileData,convertToUpperCase,lowerCase,sortSplittedData,deleteFiles};