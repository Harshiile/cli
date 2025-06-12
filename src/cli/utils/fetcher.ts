import { CLIError } from "../../controllers/utils/error";
import { getToken } from "./token";

interface Fetcher {
    url: string,
    cb: (x: any) => any,
    body?: object,
    methodType?: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    needToken: boolean
}
export const Fetcher = async ({
    url,
    cb,
    body,
    methodType = 'GET',
    needToken
}: Fetcher) => {
    let token;
    if (needToken) {
        token = getToken();
        if (!token) console.log("Token not found, Please Login Again");
    }

    const fetchOptions = methodType != 'GET' ? {
        method: methodType,
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'authorization': token || ''
        }
    } : {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token || ''
        }
    };

    return await fetch(`http://localhost:3000${url}`, fetchOptions)
        .then(res => res.json())
        .then(cb)
        .catch((err: CLIError) => {
            console.log(err)
        })
}
