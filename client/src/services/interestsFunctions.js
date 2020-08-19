import axios from 'axios'

export const getInterests = () => {
    return axios
        .get('api/interests', {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            
            return response.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const getInterestsByUserId = (id) => {
    return axios
        .get('api/interests/' + id, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            
            return response.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const saveInterestsByUserId = (id, data) => {
    return axios
        .post('api/interests/' + id, data, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err)
        });
}