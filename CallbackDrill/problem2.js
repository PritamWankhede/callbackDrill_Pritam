/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/
const fs = require('fs');

// 1. Read the given file lipsum.txt
function readFile(file,callback){
fs.readFile(file,'utf-8',(error,data)=>{
   if(error){
    console.log(`Error in file ${error}`)
   }
    //console.log(`data in file : ${data}`)
    callback(data);
})
}


//2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
  function convertAndStroreFile(data,callback)
  {
     let updatedata = data.toUpperCase();
     let newFile = 'newFile.txt';

     fs.writeFile(newFile,updatedata,(error)=>{
        if(error){
            console.log(`Error in callback code ${error}`);
            return ;
        }
         console.log(`updated data in file ${newFile}`);
         callback(newFile);
     })

      fs.appendFile('filenames.txt',newFile + '\n',(error)=>{
        if(error){
            console.log(`Error in new File ${error}`);
            return ;
        }
        // console.log(`content in newFile : ${newFile}`);
      })
}

//3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
    function readConvertAndSplitFile(newFile,callback){
     
        fs.readFile(newFile,'utf-8',(error,data)=>{
            if(error){
                console.log(`Error in file ${error}`);
            }
            console.log(`data in newFile : ${data}`);
        

       let dataTolowerCase = data.toLowerCase();

        let splitToSentence = dataTolowerCase.split(" ").join("\n");
         let newFileLowerCase = "newFileLowerCase.txt"
        fs.writeFile(newFileLowerCase,splitToSentence,(error,data)=>{
             if(error){
                console.log(`Error in files : ${error}`);
             }
             console.log(`Data in ${data}`);
            

         fs.appendFile('filenames.txt', newFileLowerCase + '\n',(error)=>{
                 if(error){
                    console.log(`error in file ${error}`);
                 }
                 return ;
             })
             callback(newFileLowerCase);
        })
    })
    }
 
 // 4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
   function sortedFile(newFileLowerCase,callback){
       fs.readFile(newFileLowerCase,'utf-8',(error,data)=>{
          if(error){
            console.log(`Error in file ${error}`);
          }
           const sortedData = data.split("\n").sort((a, b) => a.localeCompare(b)).join("\n");
           let sortedFile = "sortedFile.txt";
           fs.writeFile(sortedFile,sortedData,(error)=>{
              if(error){
                console.log(`Error in file ${error}`);
              }
           })

           fs.appendFile('filenames.txt',sortedFile+'\n', (error)=>{
            if(error){
                console.log(`Error in file ${error}`);
            }
           })
           callback(newFileLowerCase)
       })
   }

//5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
function deletelistFiles(file, callback) {
    fs.readFile(file, 'utf-8', (error, data) => {
        if (error) {
            console.log(`Error in ${error}`);
            return; 
        }
        const filesToDelete = data.split('\n').map(name => name.trim()).filter(Boolean);
        let completedDeletes = 0;

        filesToDelete.forEach((item) => {
            fs.unlink(item, (error) => {
                if (error) {
                    console.log("Error while deleting file " + item);
                } else {
                    console.log("Successfully deleted file " + item);
                }

                completedDeletes++;
                if (completedDeletes === filesToDelete.length) {
                    callback(file);
                }
            });
        });
    });
}

module.exports = {readFile,convertAndStroreFile,readConvertAndSplitFile,sortedFile,deletelistFiles};



  


 