import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Seeker from './components/Seeker'
import {AppContextProvider} from './context/appContext'

class App extends Component {
    render() {
        return (
            <AppContextProvider>
                <Router>
                    <div className="App">
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/seeker" component={Seeker} />

                    </div>
                </Router>
            </AppContextProvider>

        )
    }
}

export default App
