const inquirer = require("inquirer");
const fs = require("fs");
const generatePage = require("./src/page-template");

// puts inquirer prompt in function and asks user for information
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
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
          validate: (pNameInput) => {
            if (pNameInput) {
              return true;
            } else {
              console.log("Please enter your name!");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "description",
          message: "Provide a description of the project (required)",
          validate: (pDescription) => {
            if (pDescription) {
              return true;
            } else {
              console.log("Please enter your name!");
              return false;
            }
          },
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
          validate: (githubLink) => {
            if (githubLink) {
              return true;
            } else {
              console.log("Please enter your name!");
              return false;
            }
          },
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
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      })
  );
};

/*
promptUser() collects data about user
promptProject() collects data bout projects
takes promptProjects() data generates HTML based on information
generatePage() is the variable from the template on page-template.js
*/
promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    const pageHTML = generatePage(portfolioData);
    fs.writeFile("./index.html", pageHTML, (err) => {
      if (err) throw err;
      console.log("Page created! Check out the index HTML in this directory");
    });
  });
