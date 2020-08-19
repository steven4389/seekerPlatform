import axios from 'axios'

export const getNews = (search) => {
    const url =`http://newsapi.org/v2/everything?q=${search}&from=2020-08-17&sortBy=popularity&apiKey=fd39ddf87e3e403ba301bbfed397892a`
               
    return axios
        .get(url, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response;
        })
        .catch(err => {
            console.log(err);
        })
}
