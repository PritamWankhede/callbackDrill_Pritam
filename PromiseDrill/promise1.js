/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/
// 1. Create a directory
function createDirectory(directory) {
  return fs.mkdir(directory)
      .then(() => {
          console.log(`Directory created: ${directory}`);
      })
      .catch((error) => {
          console.error(`Error creating directory: ${error}`);
      });
}

// 2. Create JSON files in the directory
function filesInDirectory(directory, noFiles) {
  let promises = [];
  for (let index = 1; index <= noFiles; index++) {
      let filePath = `${directory}/test${index}.json`;
      let filePromise = fs.writeFile(filePath, '{}')  
          .then(() => {
              console.log(`File created: ${filePath}`);
          })
          .catch((error) => {
              console.error(`Error creating file: ${filePath}, Error: ${error}`);
          });
      promises.push(filePromise);
  }
  return Promise.all(promises);
}

// 3. Delete all files in the directory
function deleteAllFiles(directory) {
  return fs.readdir(directory)  // Read all files in the directory
      .then((files) => {
          console.log(`Directory read successfully: ${directory}`);
          const deletePromises = files.map((file) => {
              let filePath = Path.join(directory, file);
              return fs.unlink(filePath) 
                  .then(() => {
                      console.log(`File deleted: ${filePath}`);
                  })
                  .catch((error) => {
                      console.error(`Error deleting file: ${filePath}, Error: ${error}`);
                  });
          });
          return Promise.all(deletePromises);
      })
      .then(() => {
          console.log('All files deleted successfully.');
      })
      .catch((error) => {
          console.error(`Error reading directory: ${error}`);
      });
}
module.exports = {createDirectory,filesInDirectory,deleteAllFiles};   