const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const axios = require("axios");

const writeFileP = util.promisify(fs.writeFile);

const sections = [
  {
    type: "input",
    name: "gitHubUsername",
    message: "Enter your GitHub username:",
  },
  {
    type: "input",
    name: "title",
    message: "Enter your project title:",
  },
  {
    type: "input",
    name: "description",
    message: "Enter the description:",
  },
  {
    type: "checkbox",
    name: "tableOfContents",
    message: "Select the contents:",
    choices: [
      "Installation",
      "Usage",
      "License",
      "Contributing",
      "Tests",
      "Questions",
    ],
  },
  {
    type: "input",
    name: "installation",
    message: "Enter the installation instructions:",
  },
  {
    type: "input",
    name: "usage",
    message: "Enter the usage instructions:",
  },
  {
    type: "list",
    name: "license",
    message: "Select the license:",
    choices: ["MIT", "Other"],
  },
  {
    type: "input",
    name: "contributing",
    message: "Enter the contributing instructions:",
  },
  {
    type: "input",
    name: "tests",
    message: "Enter the tests (enter 'q' to quit):",
  },
  {
    type: "input",
    name: "questions",
    message: "Enter the questions (enter 'q' to quit):",
  },
];

async function generateReadme() {
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i].name;
    const {} = await inquirer.prompt(sections[i]);
    console.log(name);
  }
}

generateReadme();

/*
async function generateREADME() {
  const { gitHubUsername } = await inquirer.prompt({
    message: sections[0].prompt,
    name: sections[0].section,
  });
  const { title } = await inquirer.prompt({
    message: "Enter your project title:",
    name: "title",
  });
  const { description } = await inquirer.prompt({
    message: "Enter the description:",
    name: "description",
  });
  const { tableOfContents } = await inquirer.prompt({
    type: "checkbox",
    message: "Enter the table of contents:",
    name: "tableOfContents",
    choices: [
      "Installation",
      "Usage",
      "License",
      "Contributing",
      "Tests",
      "Questions",
    ],
  });
  const { installation } = await inquirer.prompt({
    message: "Enter the installation instructions:",
    name: "installation",
  });
  const { usage } = await inquirer.prompt({
    message: "Enter the usage instructions:",
    name: "usage",
  });
  const { license } = await inquirer.prompt({
    type: "list",
    message: "Enter the license:",
    name: "license",
    choices: ["MIT", "Other"],
  });
  const { contributing } = await inquirer.prompt({
    message: "Enter the contributing instructions:",
    name: "contributing",
  });
  const { tests } = await inquirer.prompt({
    message: "Enter the tests (separate items with semicolons):",
    name: "tests",
  });
  const { questions } = await inquirer.prompt({
    message: "Enter the questions (separate items with semicolons):",
    name: "questions",
  });

  let newREADME = `# ${title}

    ## Description

    ${description}

    ## Table of Contents

    * 
    * 
    * 

    ## Installation

    ${installation}

    ## Usage
   
    ${usage}

    ## License

    ${license}

    ## Contributing

    ${contributing}

    ## Tests

    ${tests}

    ## Questions
    
    ${questions}`;

  writeFileP("new-README.md", newREADME, function (err) {
    if (err) {
      throw err;
    }
  });
}

generateREADME();
*/
/* Example Code

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username",
  })
  .then(function ({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl).then(function (res) {
      const repoNames = res.data.map(function (repo) {
        return repo.name;
      });

      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("repos.txt", repoNamesStr, function (err) {
        if (err) {
          throw err;
        }

        console.log(`Saved ${repoNames.length} repos`);
        console.log("Saved " + repoNames.length + " repos");
      });
    });
  });
*/
