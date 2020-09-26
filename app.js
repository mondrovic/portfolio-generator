const inquirer = require("inquirer");
const generatePage = require("./src/page-template.js");
const { writeFile, copyFile } = require("./utils/generate-site.js");

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
promptProject() passes both user and project data to the generatePage() function
generatePage() passes structured information off to write to HTML with writeFile(pageHTML)
takes the promise and passes response to console; then copies the css to the dist folder if no errors are thrown
repeats the above process with the copy file
*/
promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    return generatePage(portfolioData);
  })
  .then((pageHTML) => {
    return writeFile(pageHTML);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then((copyFileResponse) => {
    console.log(copyFileResponse);
  })
  .catch((err) => {
    console.log(err);
  });
