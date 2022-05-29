const os = require('os');

const homeDir = os.homedir();

const cpuCore = os.cpus();

const coreCount = cpuCore.length;
const [cpuModel, ...restCore] = cpuCore;
