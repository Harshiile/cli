const fs = require('fs');
const os = require('os');
const path = require('path');

const getToken = () => {
    const CONFIG_PATH = path.join(os.homedir(), '.jou', 'config.json');

    if (!fs.existsSync(CONFIG_PATH)) {
        console.log("Config file does not exist, Please Login Again");
        return;
    }
    else {
        const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
        if (raw == '') {
            console.log('Token does not exist, Please Login Again');
            returnl
        }

        const { token } = JSON.parse(raw);

        return token
    }
}
module.exports = { getToken }