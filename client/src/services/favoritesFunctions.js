import axios from 'axios';

export const getFavoritesByUserId = (id) => {
    return axios
        .get('api/favorites/' + id, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            
            return response.data;
        })
        .catch(err => {
            console.log(err);
        })
}

export const saveFavoritesByUserId = (id, data) => {
    return axios
        .post('api/favorites/' + id, data, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err)
        });
}