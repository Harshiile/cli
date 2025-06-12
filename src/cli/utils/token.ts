import fs from 'fs'
import os from 'os'
import path from 'path'
import { CLIError } from '../../controllers/utils/error';

export const getToken = (): string => {
    const CONFIG_PATH = path.join(os.homedir(), '.cli', 'config.json');

    if (!fs.existsSync(CONFIG_PATH)) throw new CLIError(404, "Config file does not exist, Please Login Again")
    else {
        const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
        if (raw == '') throw new CLIError(404, 'Token does not exist, Please Login Again');

        const { token } = JSON.parse(raw);

        return token
    }
}