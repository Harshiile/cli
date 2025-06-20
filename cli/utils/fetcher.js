const { default: axios } = require('axios');
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

    const axiosOptions = methodType != 'GET' ? {
        method: methodType,
        data: body
    } : {}

    axiosOptions.headers = needToken ? {
        'authorization': token
    } : {}

    return axios(`https://jou-cli.onrender.com${url}`, axiosOptions).then(cb).catch(({ response }) => { throw new Error(response.data.message) })
};

module.exports = { Fetcher }