/*Using promises and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require('fs')
const path = require('path')

function contentToUpperCase(lipsumFile,filenames){
  return new Promise((resolve,reject)=>{
     fs.readFile(lipsumFile,'utf-8',(error,data)=>{
          if(error){
           reject(error)
           }
          else{
            console.log("File read sucessfully");
            
            let UpperCaseContent = data.toUpperCase();
            let upperCaseFIle = 'upperCaseFIle.txt'

             fs.writeFile(upperCaseFIle,UpperCaseContent,(error)=>{
              if(error){
                console.error(error);
              }
              else{
                console.log("sucessfull");

                fs.appendFile(filenames,`${upperCaseFIle}\n`,(error)=>{
                  if(error){
                    console.error(error);
                  }
                  else{
                    console.log("FIle appended sucessfully")
                    resolve(upperCaseFIle);
                  }})
              }})
        }})
    })
}


function contentToLowerCase(upperCaseFIle,filenames)
{
   return new Promise((resolve,reject)=>{
      fs.readFile(upperCaseFIle,'utf-8',(error,data)=>{
         if(error){
          return reject(error);
         }
         else{
          let lowerData = data.toLowerCase();
          let lowerCaseFile = 'lowerCaseFile.txt';
          
           fs.writeFile(lowerCaseFile,lowerData,(error)=>{
            if(error){
              return reject(error);
            }
            else{
               fs.appendFile(filenames,`${lowerCaseFile}\n`,(error)=>{
                if(error){
                  return reject(error);
                }
                else{
                  console.log("file appended");
                  resolve(filenames);
                }
               })
            }
           })}
      })
   })    
}

function deleteFile(filenames) {
  return new Promise((resolve, reject) => {
    fs.readFile(filenames, 'utf-8', (error, data) => {
      if (error) {
        return reject(error);
      }

      const fileData = data.split('\n').filter(Boolean);
      let pendingDeletions = fileData.length;

      if (pendingDeletions === 0) {
        return resolve('No files to delete');
      }

      fileData.forEach((file) => {
        const filePath = path.join(path.dirname(filenames), file);

        fs.unlink(filePath, (error) => {
          if (error) {
            return reject(error);
          }

          pendingDeletions -= 1;
          if (pendingDeletions === 0) {
            resolve('All files deleted');
          }
        });
      });
    });
  });
}


module.exports = {contentToUpperCase,contentToLowerCase,deleteFile};
