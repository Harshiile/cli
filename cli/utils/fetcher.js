const { getToken } = require('./token');

const Fetcher = async ({
    url,
    cb,
    body,
    methodType = 'GET',
    needToken
}) => {
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
        .catch((err) => {
            console.log(err)
        })
}
module.exports = { Fetcher }