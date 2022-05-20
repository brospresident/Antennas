import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/';

async function isAdmin() {
    try {
        const token = localStorage.getItem('token');
        if (token === null) return false;
        const response = await axios.get(baseUrl + 'administrators', {
            headers: {
                'authorization': `${token}`
            }
        });
        if (response.status === 401) {
            localStorage.removeItem('token');
            return false;
        }
        if (response.status === 200) return true;
        return false;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

async function logout() {
    localStorage.removeItem('token');
}

async function inviteUser(email) {
    try {
        const data = {
            email: email
        }
        // const admin = await isAdmin();
        // if (!admin)  {
        //     localStorage.removeItem('token');
        //     return;
        // }
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }
        const response = await axios.post(baseUrl + 'administrators/generate', axiosConfig);
        if (response.status === 200) {
            console.log(response.data);
            return true;
        }
    
        return false;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

async function addAntenna(data) {
    try {
        const response = await axios.post(baseUrl + 'antennas', {
            data: data
        });
        if (response.status === 201) return true;
        return false;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

async function getAllAntennas() {
    try {
        const response = await axios.get(baseUrl + 'antennas');
        if (response.status === 200) return response.data;
        return false;
    }
    catch (e) {
        console.log(e);
        return [];
    }
}

async function register(data) {
    try {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            },
            data: data,
        }
        const response = await axios.post(baseUrl + 'authenticator/register', axiosConfig);
        if (response.status === 201) {
            localStorage.setItem('token', response.data.token.token);
            return true;
        }
        return false;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

async function login(data) {
    try {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json'
            },
            data: data,
        }
        const response = await axios.post(baseUrl + 'authenticator/login', axiosConfig);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token.token);
            return true;
        }
        return false;
    }
    catch (e) {
        console.log(e);
        return false;
    }
}

export {
    isAdmin,
    addAntenna,
    register,
    login,
    logout,
    inviteUser,
    getAllAntennas
}