import axios from "axios";

export const login = (email, password) => {
    var auth = {
        "email": email,
        "password": password
    }

    const baseUrl = "http://4aed22d3a6fc.ngrok.io/"
    return axios.post(`${baseUrl}/login`, auth).then(result => { return result; })
        .catch(error => { return Promise.reject(error); });
};

export const createAccount = (email, password) => {
    var auth = {
        "email": email,
        "password": password
    }

    const baseUrl = "http://4aed22d3a6fc.ngrok.io/"
    return axios.post(`${baseUrl}/create_account`, auth).then(result => { return result; })
        .catch(error => { return Promise.reject(error); });
};