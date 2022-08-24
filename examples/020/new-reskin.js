require('colors');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const readLineSync = require('readline-sync');
const fse = require('fs-extra');
const open = require('opn');

const GAME_JSON_FILENAME = 'game.json';
let { gameName, gamePrimaryColor, gameSecondaryColor } = argv;

const confirmColorInput = (color, colorType = 'primary') => {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

  if (hexColorRegex.test(color)) {
    return color;
  }

  return readLineSync.question(
    `Enter a Hex code for the game ${colorType} color `,
    {
      limit: hexColorRegex,
      limitMessage: 'Enter a valid hex code: #efefef',
    }
  );
};

if (gameName === undefined) {
  gameName = readLineSync.question('What is the name of the new reskin? ', {
    limit: (input) => input.trim().length > 0,
    limitMessage: 'The prpject has to have a name, try again',
  });
}

gamePrimaryColor = confirmColorInput(gamePrimaryColor, 'primary');
gameSecondaryColor = confirmColorInput(gameSecondaryColor, 'secondary');

console.log(
  `Creating a new reskin '${gameName}' with skin color: Primary '${gamePrimaryColor}' Secondary: '${gameSecondaryColor}'`
);

const src = path.join(__dirname, 'template');
const destination = path.join(__dirname, 'releases', gameName);
const configurationFilePath = path.join(destination, GAME_JSON_FILENAME);
const projectToOpen = path.join(
  'http://localhost:8081',
  'releases',
  gameName,
  'index.html'
);

fse
  .copy(src, destination)
  .then(() => {
    console.log(`Successfully created ${destination}`.green);
    return fse.readJSON(configurationFilePath);
  })
  .then((config) => {
    const newConfig = config;
    newConfig.primaryColor = gamePrimaryColor;
    newConfig.secondaryColo = gameSecondaryColor;
    return fse.writeJSON(configurationFilePath, newConfig);
  })
  .then(() => {
    console.log(`Updated configuration file ${configurationFilePath}`.green);
    openGameIfAgreed(projectToOpen);
  })
  .catch(console.error);

const openGameIfAgreed = (fileToOpen) => {
  const isOpeningGame = readLineSync.keyInYN('Would you like to open game ? ');

  if (isOpeningGame) {
    open(fileToOpen);
  }
};
