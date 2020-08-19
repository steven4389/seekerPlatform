import React, {Component} from 'react'
import {getVideos} from '../services/youtubeFunctions';
import ReactDOM from 'react-dom';
import {getNews} from '../services/newsApiFunctions';
import {AppContext} from '../context/appContext';
import jwt_decode from 'jwt-decode';
import {getEconomicSectorsByUserId} from '../services/econimicSectors';
import {getInterestsByUserId} from '../services/interestsFunctions';
import Navbar from '../components/Navbar';
import {saveFavoritesByUserId} from '../services/favoritesFunctions';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Seeker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wikiSearchReturnValues: [],
            wikiSearchTerms: '',
            news: [],
            videos: []
        }
    }

    async componentDidMount() {
        const {interests, economicSectors} = this.context;
        let interesesName = [];
        let economicSectorsName = [];

        if(interests.length !== 0) {
            interesesName = interests.map(x => x.name);
            economicSectorsName = economicSectors.map(x => x.name);
            console.log("interesesName", interesesName)
            const dataArray = interesesName.concat(economicSectorsName);
            console.log("Math.floor(Math.random() * (interesesName.length - 0)) + 0", Math.floor(Math.random() * (dataArray.length - 0)) + 0);

            await this.setState({
                WikiSearchTerms: dataArray[Math.floor(Math.random() * (dataArray.length - 0)) + 0]
            });
            this.eventSearch();
        } else {
            const token = localStorage.getItem("usertoken");
            const decoded = jwt_decode(token);
            let arrayData = []

            await getEconomicSectorsByUserId(decoded.sub).then(res => {

                const economicSectorName = res.data.map(x => x.economicSectorName)

                arrayData = arrayData.concat(economicSectorName);

            });

            await getInterestsByUserId(decoded.sub).then(res => {

                const interestName = res.data.map(x => x.interestName)
                arrayData = arrayData.concat(interestName);
                console.log(arrayData)
                this.setState({
                    WikiSearchTerms: arrayData[Math.floor(Math.random() * (arrayData.length - 0)) + 0]
                })
            });
            this.eventSearch();
        }

    }

    eventSearch = (e) => {
        if(e) {
            e.preventDefault();
        }
        this.senDataYoutubeApi(this.state.WikiSearchTerms)
        this.setState({
            wikiSearchReturnValues: []
        });

        const pointerToThis = this;

        var url = "https://en.wikipedia.org/w/api.php";

        var params = {
            action: 'query',
            list: 'search',
            srsearch: this.state.WikiSearchTerms,
            format: 'json'
        };

        url = url + '?origin=*';
        Object.keys(params).forEach((key) => {
            url += "&" + key + "=" + params[key];
        });


        getNews(this.state.WikiSearchTerms).then(res => {
            if(res) {
                console.log("getNews", res)
                this.setState({
                    news: res.data.articles
                });
                this.renderedNews()
            }
        });

        fetch(url)
            .then(
                function (response) {
                    let loadingEcoSec = document.getElementById('loading');
                    if(loadingEcoSec !== null){
                        loadingEcoSec.remove();
                    }
                    
                    return response.json();
                }
                
            )
            .then(
                function (response) {

                    for(var key in response.query.search) {
                        pointerToThis.state.wikiSearchReturnValues.push({
                            queryResultPageFullURL: 'no link',
                            queryResultPageID: response.query.search[key].pageid,
                            queryResultPageTitle: response.query.search[key].title,
                            queryResultPageSnippet: response.query.search[key].snippet
                        });
                    }
                }
            )
            .then(
                function (response) {
                    for(var key2 in pointerToThis.state.wikiSearchReturnValues) {
                        let page = pointerToThis.state.wikiSearchReturnValues[key2];
                        let pageID = page.queryResultPageID;
                        let urlForRetrievingPageURLByPageID = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${pageID}&inprop=url&format=json`;

                        fetch(urlForRetrievingPageURLByPageID)
                            .then(
                                function (response) {
                                    if(response) {
                                        return response.json();
                                    }

                                }
                            )
                            .then(
                                function (response) {
                                    if(response) {
                                        page.queryResultPageFullURL = response.query.pages[pageID].fullurl;

                                        pointerToThis.forceUpdate();
                                    }

                                }
                            )
                    }
                }
            )
    }

    changeWikiSearchTerms = (e) => {
        this.setState({
            WikiSearchTerms: e.target.value
        });
    }

    favorites(n) {
        console.log("----------------")
        console.log(n)
        const token = localStorage.getItem("usertoken");
        const decoded = jwt_decode(token);

        const data = {
            "title": n.title,
            "author": n.author,
            "content": n.content,
            "description": n.description,
            "publishedAt": n.publishedAt,
            "url": n.url,
            "urlToImage": n.urlToImage,
            "user_id": decoded.sub
        }
        saveFavoritesByUserId(decoded.sub, data).then(res => {
            console.log("saveFavoritesByUserId", res)
            toast.success("añadido a favoritos", 'success')
        });

    }

    async senDataYoutubeApi(search) {

        await getVideos(search).then(res => {
            if(res) {
                this.setState({
                    videos: res.data.items
                })
            }

        });

        const element = this.state.videos.map((video) => {
            return (<div className=' video-item item'>
                <iframe src={`https://www.youtube.com/embed/${video.id.videoId}`} allowFullScreen title="Video player" />
            </div>);
        });
        ReactDOM.render(element, document.getElementById('videos'));
        this.setState({
            videos: []
        });

    }

    renderedNews() {

        if(this.state.news.length !== 0){
            const element = this.state.news.map((n) => {

                if(n.content !== null) {
                    if(n.content.includes('[')) {
                        let index = n.content.indexOf('[');
                        index = n.content.substr(index, n.content.length);
                        n.content = n.content.replace(index, '')
                    }
                }
    
                return (<div className=' video-item'>
                    <h6><strong>{n.title}</strong></h6>
                    <div className="bodyNew">
                        <p>
                            {n.content} <span type='button' className="button"><a target="_blank" href={n.url}>Leer más</a></span>
                        </p>
                        <img className="image" src={n.urlToImage} alt='' />
                    </div>
    
                    <div className="divisor">
                        <span value={n} onClick={this.favorites.bind(this, n)}><i className="far fa-thumbs-up fa-flip-horizontal likeIcon"></i></span>
                    </div>
                </div>);
            });
            let loadingEcoSec = document.getElementById('loadingEcoSec');
            if(loadingEcoSec !== null){
                loadingEcoSec.remove();
            }
            
            ReactDOM.render(element, document.getElementById('news'));
            this.setState({
                news: []
            });
        }else{
            let loadingEcoSec = document.getElementById('loadingEcoSec');
            if(loadingEcoSec !== null){
                loadingEcoSec.remove();
            }
            
            const element = <span>No se encontaron noticias acerca de este tema</span>
            ReactDOM.render(element, document.getElementById('news'));
        }
        
    }


    render() {
        let wikiSearchResults = [];

        for(var key3 in this.state.wikiSearchReturnValues) {
            wikiSearchResults.push(
                <div className="searchResultDiv" key={key3}>
                    <h3><a href={this.state.wikiSearchReturnValues[key3].queryResultPageFullURL} target="_blank">{this.state.wikiSearchReturnValues[key3].queryResultPageTitle}</a></h3>
                    <p className="description" dangerouslySetInnerHTML={{__html: this.state.wikiSearchReturnValues[key3].queryResultPageSnippet}}></p>
                </div>
            );
        }

        return (
            <div>
                <Navbar />
                <div className="seekerBody">
                    <div className="col-sm-10 mx-auto seekerContainer">
                        <div className="input-group">
                            <input type="text" value={this.state.WikiSearchTerms || ''} className="form-control" onChange={this.changeWikiSearchTerms} placeholder="Search"></input>
                            <div className="input-group-btn">
                                <button onClick={this.eventSearch} className="btn btn-default" type="submit">
                                    <span>Buscar</span>
                                </button>
                            </div>
                        </div>
                        <div id="mainContainer" className="row">
                            <div className="col-12 col-md-8 col-lg-8 col-xl-8">
                            
                                <div id="news"><div className="load" id="loadingEcoSec"><i className="fas fa-spinner fa-spin icon"></i></div></div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 col-xl-4 articles">
                                <div id="videos"></div>
                                <div id="wiki">
                                
                                    <div id="iconAndTitle"><i className="fas fa-newspaper"></i>
                                        <h6>Artículos</h6></div>
                                        
                                    {wikiSearchResults.length !== 0? wikiSearchResults: <span><br/>No se encontraron articulos relacionados</span>}
                                    
                                </div>
                                <div className="load" id="loading"><i className="fas fa-spinner fa-spin icon"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        )
    }
}
Seeker.contextType = AppContext;
export default Seeker


