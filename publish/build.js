const fs = require('fs');
const {resolve} = require('path');
const {exec} = require('child_process');
const packageJSON = require('../package.json');

function rootPath(dir) {
    return resolve(process.cwd(), dir);
}

exec('npm run dist && npm run dist:dts', { cwd: process.cwd() }, (err, stdout, stderr) => {
    if (err) {
        return console.log(err);
    }

    console.log(stderr);

    const doFile = rootPath('dist/uni-simple-router.d.ts');
    fs.writeFileSync(doFile, `
// @ts-ignore
declare module 'vue/types/vue' {
    interface Vue {
        $Router: Router;
        $Route: routeRule;
    }
}
    `, {flag: 'a+'});

    console.log(
        `✅ ${packageJSON.name}@${packageJSON.version}----------------打包成功`
    );
});
