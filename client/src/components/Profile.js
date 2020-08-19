import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {getProfile} from '../services/UserFunctions';
import {getEconomicSectors, getEconomicSectorsByUserId, saveEconomicSectorsByUserId} from '../services/econimicSectors';
import {getInterests, getInterestsByUserId, saveInterestsByUserId} from '../services/interestsFunctions';
import {AppContextProvider, AppContext} from '../context/appContext';
import Navbar from '../components/Navbar';


class Profile extends Component {

    constructor() {
        super()
        this.state = {
            id: null,
            name: '',
            email: '',
            interests: [{id: null, name: ''}],
            economicSectors: [{id: null, name: '', checked: false}],
            arrayInterestsPersisted: [],
            arrayEconomicSectorsPersisted: []
        }
        this.updateProfile = this.updateProfile.bind(this);
    }

    async componentDidMount() {

        await getProfile().then(res => {

            localStorage.setItem('username', res.user.name);
            this.setState({
                id: res.user.id,
                name: res.user.name,
                email: res.user.email
            })

            getEconomicSectorsByUserId(res.user.id).then(res => {

                this.setState({
                    arrayEconomicSectorsPersisted: res.data.map(x => x.id)
                })
            });

            getInterestsByUserId(res.user.id).then(res => {

                this.setState({
                    arrayInterestsPersisted: res.data.map(x => x.id)
                })
            });

        });

        await getEconomicSectors().then(response => {

            const data = response.map(x => {
                const check = this.state.arrayEconomicSectorsPersisted.find(y => y === x.id) === undefined ? false : true;
                const obj = {id: null, name: '', checked: check};
                obj.id = x.id;
                obj.name = x.economicSectorName
                return obj;
            });
            this.setState({
                economicSectors: data
            })

        });
       
        
        let loadingEcoSec = document.getElementById('loadingEcoSec');
        loadingEcoSec.remove();
        this.renderEconomicSectorsContainer();
        await getInterests().then(response => {

            const data = response.map(x => {
                const check = this.state.arrayInterestsPersisted.find(y => y === x.id) === undefined ? false : true;
                const obj = {id: null, name: '', checked: check};
                obj.id = x.id;
                obj.name = x.interestName
                return obj;
            });

            this.setState({
                interests: data
            })

        });
        
        let loadingInterests = document.getElementById('loadingInterests');
        loadingInterests.remove();
        this.renderInterestsContainer();
        
    }

    onChangeValue = (e) => {
        let item = parseInt(e.target.value);
        const id = e.target.id;

        this.setState(state => {
            //interests----------------
            if(id === "intereses") {

                const obj = this.state.interests.find(x => x.id === item);
                const i = state.interests.indexOf(obj);
                state.interests[i].checked = !state.interests[i].checked;
                this.renderInterestsContainer();
            } else {
                const obj = this.state.economicSectors.find(x => x.id === item);
                const i = state.economicSectors.indexOf(obj);
                state.economicSectors[i].checked = !state.economicSectors[i].checked;
                this.renderEconomicSectorsContainer()
            }

        });

    }

    renderEconomicSectorsContainer() {
        const element = (<div>
            {this.state.economicSectors.map(x =>
                <span className="interests" key={x.id}>
                    <input id="ecoSector" type="checkbox" checked={x.checked} value={x.id} onChange={this.onChangeValue}></input>
                    <p>{x.name}</p>
                </span>)
            }
        </div>);
        ReactDOM.render(element, document.getElementById('economicSectorsContainer'));
    }

    renderInterestsContainer() {
        const element = (<div>
            {this.state.interests.map(x => <span className="interests" key={x.id}><input id="intereses" type="checkbox" checked={x.checked} value={x.id}
                onChange={this.onChangeValue}></input><p>{x.name}</p></span>)}
        </div>);
        ReactDOM.render(element, document.getElementById('interestsContainer'));
    }

    async updateProfile(event){
        event.preventDefault();
        let dataInterests = this.state.interests.filter(x => x.checked === true);
        const {setInterests}=this.context;
        setInterests(dataInterests);
        let dataEconomicSectors = this.state.economicSectors.filter(x => x.checked === true);
        const {setEconomicSector}=this.context;
        setEconomicSector(dataEconomicSectors);
        dataInterests = dataInterests.map(x=>x.id);
        dataEconomicSectors= dataEconomicSectors.map(x=>x.id);
        await saveEconomicSectorsByUserId(this.state.id, dataEconomicSectors).then();
        await saveInterestsByUserId(this.state.id, dataInterests).then();
        
        this.props.history.push(`/seeker`)

    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                <div className="titulo">
                    <h1>Perfil</h1>
                </div>
                <div className="profileContainer">
                    <table className="table col-md-4 mx-auto">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{this.state.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="profileContainer">
                    <h5>Intereses</h5>
                        <div className="load" id="loadingInterests"><i class="fas fa-spinner fa-spin icon"></i></div>
                    <div id="interestsContainer">
                    
                    </div>
                </div>
                <div className="profileContainer">
                    <h5>Sectores Económicos</h5>
                        <div className="load" id="loadingEcoSec"><i className="fas fa-spinner fa-spin icon"></i></div>
                    <div id="economicSectorsContainer">
                    
                    </div>
                </div>
                <br />
                <button onClick={this.updateProfile} className="btn btn-block btn-success" type='button'>Enviar</button>
                <br />
                </div>
               
            </div>
        )
    }
}

Profile.contextType = AppContext;

export default Profile


