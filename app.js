// adds fs to write files
fs = require("fs");
const generatePage = require("./src/page-template");

// gets arguments and filters out uneccesary information
const profileDataArgs = process.argv.slice(2, process.argv.length);

// creates variables for data sent through CLI. Can assign both variables in one line
const [name, github] = profileDataArgs;

// writes file to system. (filename, function, error)
fs.writeFile("index.html", generatePage(name, github), (err) => {
  if (err) throw err;
  console.log(
    "Portfolio complete! Check out the index.html to see the output!"
  );
});
