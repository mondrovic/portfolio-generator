// takes argument and gets rid of node install location && app location
const profileDataArgs = process.argv.slice(2, process.argv.length);

// uses arrow function to display all array items
const printProfileData = (profileDataArr) => {
  for (let i = 0; i < profileDataArr.length; i += 1) {
    console.log(profileDataArr[i]);
  }
  console.log("==================");

  profileDataArr.forEach((profileItem) => console.log(profileItem));
};

printProfileData(profileDataArgs);
