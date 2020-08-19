import axios from 'axios';
const KEY = 'AIzaSyB2VRln1RRcOu1HLt_1wkyztquNdnrfTfk'; // mention your youtube API key here

export const getVideos= (search) => {
        const url =`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&key=${KEY}&q=${search}`
                   
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
    