const inquirer = require("inquirer");

/*
// adds fs to write files
fs = require("fs");
const generatePage = require("./src/page-template");

// creates variables for data sent through CLI. Can assign both variables in one line
const [name, github] = profileDataArgs;

// writes file to system. (filename, function, error)
fs.writeFile("index.html", generatePage(name, github), (err) => {
  if (err) throw err;
  console.log(
    "Portfolio complete! Check out the index.html to see the output!"
  );
});
*/

// puts inquirer prompt in function and asks user for information
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name",
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username",
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself",
    },
  ]);
};

const promptProject = (portfolioData) => {
  // checks if array exists first before creating a new one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  // creates a clean line
  console.log(`
    ==================
    Add a New Project
    ==================
    `);
  // runs inquirer to gather info from user
  return (
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of your project?",
        },
        {
          type: "input",
          name: "description",
          message: "Provide a description of the project (required)",
        },
        {
          type: "checkbox",
          name: "languages",
          message:
            "What did you build this project with? (Check all that apply)",
          choices: [
            "Javascript",
            "HTML",
            "CSS",
            "ES6",
            "jQuery",
            "Bootstrap",
            "Node",
          ],
        },
        {
          type: "input",
          name: "link",
          message: "Enter the Github link to your project (Required)",
        },
        {
          type: "confirm",
          name: "feature",
          message: "Would you like to feature this project?",
          default: false,
        },
        {
          type: "confirm",
          name: "confirmAddProject",
          message: "Would you like to enter another project?",
          default: false,
        },
      ])
      // takes a promise from inquirer gathered data then pushes it to created array
      .then((projectData) => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProjects) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      })
  );
};

promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    console.log(portfolioData);
  });
