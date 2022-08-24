require('colors');

const path = require('path');
const shell = require('shelljs');
const { repositories } = require('./config.json');

const repositoriesDirectory = path.join(__dirname, 'my-repositories');

function cloneRepositories(repositoryPath, repositoryList = []) {
  const repositoriesCount = repositoryList.length;

  if (!repositoryPath || repositoriesCount === 0) {
    console.log('Invalid path or repository list');
    return;
  }

  console.log(`Cloning repositories to ${repositoryPath}`.blue);

  shell.cd(repositoryPath);

  repositoryList.forEach((repository, index) => {
    console.log(`Cloning ${index} of ${repositoriesCount}`.cyan);
    shell.exec(`git clone ${repository} --progress -b master`);
  });

  console.log('Completed cloning of repositories'.green);
}

cloneRepositories(repositoriesDirectory, repositories);
