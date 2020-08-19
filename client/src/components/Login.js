import React, {Component} from 'react'
import {login} from '../services/UserFunctions'
import swal from 'sweetalert';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
           console.log("loginres", res);
            if(res) {
                console.log("loginRes", res)
                this.props.history.push(`/profile`)
            }else{
                swal("","usuario o contraseña invalidos", "error");
            }
        })
    }

    render() {
        return (
            <div>
                <div className="imageLogin">
                    <div className="bodyLogin">
                        <div id="loginForm">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Please sign in
                           </h1>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Sign in
                            </button>
                            <span id="registro" onClick={()=>this.props.history.push(`/register`)}>Registrate ahora</span>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
