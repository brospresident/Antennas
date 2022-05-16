import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/';

async function isAdmin() {
    const token = localStorage.getItem('token');
    if (token === null) return false;
    const response = await axios.get(baseUrl + 'administrators', {
        headers: {
            'authorization': `${token}`
        }
    });
    if (response.status === 200) return true;
    return false;
}

async function addAntenna(data) {
    const token = localStorage.getItem('token');
    if (token === null) return false;
    const response = await axios.post(baseUrl + 'antennas', data, {
        headers: {
            'authorization': `${token}`
        }
    });
    if (response.status === 200) return true;
    return false;
}

export {
    isAdmin,
    addAntenna
}