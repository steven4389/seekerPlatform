import React, {Component} from 'react'
import {register} from '../services/UserFunctions'
import swal from 'sweetalert';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            cellphone: '',
            dateBirth: '',
            sexo: '',
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

        const newUser = {
            name: this.state.first_name + ' ' + this.state.last_name,
            email: this.state.email,
            cellphone: this.state.cellphone,
            dateBirth: this.state.dateBirth,
            sexo: this.state.sexo,
            password: this.state.password
        }

        let fecha1 = new Date(this.state.dateBirth);
        let fecha2 = new Date()

        let resta = fecha2.getTime() - fecha1.getTime()
        
        resta=Math.round(resta / (1000 * 60 * 60 * 24));
        console.log(Math.round(resta));

        if(resta >= 6570){
            register(newUser).then(res => {
                this.props.history.push(`/login`)
                swal("","Registro exitoso", "success");
            })
        }else{
            swal("Registro no valido", "Debes ser mayor de 18 años", "error");
        }
        
    }

    render() {
        return (
            <div>
                <div className="imageLogin">
                    <div className="bodyLogin">
                        <div id="loginForm">
                            <form noValidate onSubmit={this.onSubmit}>
                                <h1 className="h3 mb-3 font-weight-normal">
                                    Register
                            </h1>
                                <div className="form-group">
                                    <label htmlFor="name">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        placeholder="Enter your first name"
                                        value={this.state.first_name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        placeholder="Enter your lastname name"
                                        value={this.state.last_name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Número telefónico</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cellphone"
                                        placeholder="Número telefónico"
                                        value={this.state.cellphone}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Fecha de nacimiento</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="dateBirth"
                                        placeholder="fecha de nacimiento"
                                        value={this.state.dateBirth}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Sexo</label>
                                    <br />
                                    <div className="sex">
                                        Masculino <input
                                            type="radio"
                                            className="form-control radio"
                                            name="sexo"
                                            placeholder="fecha de nacimiento"
                                            value="masculino"
                                            onChange={this.onChange}
                                        />
                                Femenino <input
                                            type="radio"
                                            className="form-control radio"
                                            name="sexo"
                                            placeholder="fecha de nacimiento"
                                            value="femenino"
                                            onChange={this.onChange}
                                        />
                                    </div>

                                </div>
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
                                    Register!
                            </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
