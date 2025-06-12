const fs = require('fs');
const os = require('os');
const path = require('path');

const getToken = () => {
    const CONFIG_PATH = path.join(os.homedir(), '.cli', 'config.json');

    if (!fs.existsSync(CONFIG_PATH)) throw new Error("Config file does not exist, Please Login Again")
    else {
        const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
        if (raw == '') throw new Error('Token does not exist, Please Login Again');

        const { token } = JSON.parse(raw);

        return token
    }
}
module.exports = { getToken }