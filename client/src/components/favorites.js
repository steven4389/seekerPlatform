import React, {Component} from 'react'
import Navbar from '../components/Navbar';
import {getFavoritesByUserId} from '../services/favoritesFunctions';
import jwt_decode from 'jwt-decode';
import ReactDOM from 'react-dom';

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: []
        }
        this.renderedNews = this.renderedNews.bind(this);
    }

    async componentDidMount(){
        const token = localStorage.getItem("usertoken");
        const decoded = jwt_decode(token);
        await getFavoritesByUserId(decoded.sub).then(res=>{
            if(res){
                 this.setState({
                    favorites: res
                });
            }
        });
        console.log(this.state.favorites)
        this.renderedNews();
    }

    renderedNews() {
        const element = this.state.favorites.data.map((n) => {
            let index = n.content.indexOf('[');
            index = n.content.substr(index, n.content.length);
            n.content = n.content.replace(index, '')

            return (<div className='video-item'>
                <div className="fav">
                <h6><strong>{n.title}</strong></h6>
                <div className="bodyNew">
                    <p>
                        {n.content} <span type='button' className="button"><a target="_blank" href={n.url}>Leer más</a></span>
                    </p>
                    <img className="image" src={n.urlToImage} alt='' />
                </div>
                </div>
                <div className="divisor"></div>
            </div>);
        });
        ReactDOM.render(element, document.getElementById('favorites'));
        this.setState({
            news: []
        });
    }

    render() {
        return (
            <div>
              <Navbar />
              <br/>
              <div className="seekerBody">
                    <div id="favorites"></div>
              </div>
            </div>
        )
    }
}

export default Favorites
