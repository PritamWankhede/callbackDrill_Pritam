
//1st exercise
// function firstExercise(){
//     console.log("Program Started..");

//     let promise = new Promise((resolve,reject)=>{
//         setTimeout(()=>{
           
//             resolve("setime promise");
//       },3000);

//  })
    
//   console.log(promise);

//   console.log("Program in progess...");

//   promise.then((message)=>{
//     console.log(message);
//   })
// }
// firstExercise();

//2nd Exercise
/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 3 seconds
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well
    5. Print out "Program complete" when the promise completes after 3 seconds

    HINT: Use setTimeout for the delay
*/
// function secondExercise(){
//    console.log("Program started");

//    const promise = new Promise((resolve,reject)=>{
//       setTimeout(()=>{
//         resolve("promise of 3 second")
//       },3000);
//    })

//    console.log(promise);

//    console.log("Program in progress...");

//    promise.then((message)=>{
//      console.log(message);
//    })
// }
// secondExercise()


//3rd Exercise
/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 3 seconds
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well
    5. Print out "Step 1 complete" when the first promise fulfills
    6. Have the first promise return another new Promise that will
       fulfill after 3 seconds with the message: "Step 2 Complete"
    7. Print out the message from the second promise after it
       fulfills ("Step 2 Complete")
    HINT: Use setTimeout for the delay
*/

function thirdExercise(){
   console.log("Program started");

   const promise = new Promise((resolve,reject)=>{
     setTimeout(()=>{
        resolve("")
     },300)
   })
  
   // 3. Log out the promise while it's pending
   console.log(promise);

   //4. Print out "Program in progress..." as well
    console.log("Program in progress...")

   //5. Print out "Step 1 complete" when the first promise fulfills
   promise.then((message)=>{
    console.log(message); 
})

  // 6. Have the first promise return another new Promise that will
  //    fulfill after 3 seconds with the message: "Step 2 Complete
     return new Promise((resolve)=>{
         setTimeout(()=>{
            resolve("Step 2 completed");
         },3000)
     }).then(()=>{
         console.log("Step 2 Complete");
     })
}
console.log(thirdExercise());



