import React, {Component} from 'react'

class Landing extends Component {


    render() {
        return (
            <div>
                <div className="home">

                    <div className="container homeContainer">
                        <span>PLATAFORMA SEEKER</span>
                        <p>Poderosa plataforma web de busquedas de multiples, ajustada atus necesidades</p>
                    </div>

                </div>
                <button id="accederButton" className="btn btn-primary btn-sm" onClick={() => this.props.history.push(`/login`)} type='button'>ACCEDER</button>
                <span id="seekerLogo"><b>SEEKER</b></span>
                <div className="presentation">
                    <div className="container pres">
                        <div className="row">
                            <div className="col-12 col-md-4 col-lg-4 col-xl-4 caja">
                                <span>Noticias</span>
                                <div className="box">
                                    <i  className="fab fa-apple fa-3x"></i>
                                </div>
                                <p>Mas de 30.000 noticias a tu disposicion
                                e informacion al día
                                </p>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 col-xl-4 caja">
                                <span>Videos</span>
                                <div className="box">
                                    <i className="fas fa-rocket fa-3x"></i>
                                </div>
                                <p>Miles de videos relacionados con tus intereses y todo
                                lo que puedas buscar
                                </p>
                            </div>
                            <div className="col-12 col-md-4 col-lg-4 col-xl-4 caja">
                                <span>Artículos</span>
                                <div className="box">
                                    <i className="fas fa-cogs fa-3x"></i>
                                </div>
                                <p>
                                    Millones de artículos desde los cuales podras
                                    tener información detallada para tus búsquedas
                               </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing
