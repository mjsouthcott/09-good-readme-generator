const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const axios = require("axios");

const writeFileP = util.promisify(fs.writeFile);

let newREADME = "";

async function generateREADME() {
  // Ask for GitHub username
  const { GitHubUsername } = await inquirer.prompt({
    message: "Enter your GitHub username:",
    name: "GitHubUsername",
  });

  // Use GitHub API to get URL for user's avatar
  const queryURL = `https://api.github.com/users/${GitHubUsername}/repos?per_page=100`;
  const res = await axios.get(queryURL);
  GitHubAvatarURL = res.data[0].owner.avatar_url;

  const { repositoryName } = await inquirer.prompt({
    message: "Enter the repository name:",
    name: "repositoryName",
  });

  // Ask for project title
  const { title } = await inquirer.prompt({
    message: "Enter your project title:",
    name: "title",
  });
  newREADME += `# ${title}\n\n## Owner\n\nGitHub Username: ${GitHubUsername}\n\n![Git Hub Avatar](${GitHubAvatarURL})\n\n`;

  // Ask for project description
  const { description } = await inquirer.prompt({
    message: "Enter the description:",
    name: "description",
  });
  newREADME += `## Description\n\n${description}\n\n`;

  // Ask for contents
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
  newREADME += `## Table of Contents\n\n`;
  tableOfContents.forEach(function (item) {
    newREADME += `* [${item}](https://github.com/mjsouthcott/${repositoryName}#${item})\n`;
  });
  newREADME += `\n`;

  // If user selected "Installation", ask for installation instructions
  if (tableOfContents.includes("Installation")) {
    const { installation } = await inquirer.prompt({
      message: "Enter the installation instructions:",
      name: "installation",
    });
    newREADME += `## Installation\n\n${installation}\n\n`;
  }

  // If user selected "Usage", ask for use instructions
  if (tableOfContents.includes("Usage")) {
    const { usage } = await inquirer.prompt({
      message: "Enter the usage instructions:",
      name: "usage",
    });
    newREADME += `## Usage\n\n${usage}\n\n`;
  }

  // If user selected "License", ask for a license
  if (tableOfContents.includes("License")) {
    const { license } = await inquirer.prompt({
      type: "list",
      message: "Enter the license:",
      name: "license",
      choices: ["MIT", "Other"],
    });
    newREADME += `## Licence\n\n`;

    if (license === "MIT") {
      newREADME += `MIT License\n\nCopyright (c) 2020 Matthew James Southcott\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n`;
    } else {
      const { licenseText } = await inquirer.prompt({
        message: "You selected 'Other'. Enter the license:",
        name: "licenseText",
      });
      newREADME += `${licenseText}\n\n`;
    }
  }

  // If user selected "Contributing", ask for contributing instructions
  if (tableOfContents.includes("Contributing")) {
    const { contributing } = await inquirer.prompt({
      message: "Enter the contributing instructions:",
      name: "contributing",
    });
    newREADME += `## Contributing\n\n${contributing}\n\n`;
  }

  // If user selected "Tests", ask for tests
  if (tableOfContents.includes("Tests")) {
    const { tests } = await inquirer.prompt({
      message: "Enter the tests (separate tests with semicolons):",
      name: "tests",
    });
    newREADME += `## Tests\n\n`;
    tests.split(";").forEach(function (item) {
      newREADME += `* ${item.trim()}\n`;
    });
    newREADME += `\n`;
  }

  // If user selected "Questions", ask for questions
  if (tableOfContents.includes("Questions")) {
    const { questions } = await inquirer.prompt({
      message: "Enter the questions (separate questions with semicolons):",
      name: "questions",
    });
    newREADME += `## Questions\n\n`;
    questions.split(";").forEach(function (item) {
      newREADME += `* ${item.trim()}\n`;
    });
    newREADME += `\n`;
  }

  // Add followers badge
  newREADME += `## Badges\n\n![GitHub followers](https://img.shields.io/github/followers/${GitHubUsername}?label=Follow&style=social)`;

  // Write README to file
  writeFileP("newREADME.md", newREADME, function (err) {
    if (err) {
      throw err;
    }
  });
}

generateREADME();
