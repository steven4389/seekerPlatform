import axios from 'axios'

export const getEconomicSectors = () => {
    return axios
        .get('api/economicSectors', {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const getEconomicSectorsByUserId = (id) => {
    return axios
        .get('api/economicSectors/' + id, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const saveEconomicSectorsByUserId = (id, data) => {
    return axios
        .post('api/economicSectors/' + id, data, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err)
        });
}