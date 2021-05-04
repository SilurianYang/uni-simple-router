const fs = require('fs');
const {resolve} = require('path');
const {exec} = require('child_process');
const packageJSON = require('../package.json');

function rootPath(dir) {
    return resolve(process.cwd(), dir);
}

const doFile = rootPath('package.json');

const reg = /\s+("dependencies"|"devDependencies")\s*:\s*{[^\}]+\},/g;

const originalJSON = fs.readFileSync(doFile).toString();

const writeFile = originalJSON.replace(reg, '');

fs.writeFileSync(doFile, writeFile);

exec('npm publish', (err, stdout, stderr) => {
    if (err) {
        return console.log(err);
    }
    console.log(stderr);
    console.log(
        `✔ ${packageJSON.name}@${packageJSON.version}----------------发布成功`
    );

    fs.writeFileSync(doFile, originalJSON);
});
