import React, { useState } from 'react'
import fondo from '/images/home/home-img.jpg'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import About from '../About/About';

import categorias from '/public/images/home/carousel/categorias.png'
import busqueda from '/public/images/home/carousel/busqueda.png'
import medio from '/public/images/home/carousel/medio.png'
import medios from '/public/images/home/carousel/medios.png'
import notas from '/public/images/home/carousel/notas.png'
import perfil from '/public/images/home/carousel/perfil.png'


export default function HomePage() {
    const [showAbout, setShowAbout] = useState(false);

    const show_hide_toggle = (e) => {
        setShowAbout(e);
    };

    return (
        <div className='homepage-container'>
            <Navbar />
            <div className='homepage-body'>
                <div className='homepage-body-text text-1'>
                    ¿Eres amante del entretenimiento y quieres tener tu biblioteca personal de tus películas,
                    series, novelas, anime, manga y videojuegos favoritos? con Memorial, ¡es posible!
                </div>
                <div className='homepage-body-img'>
                    <img src={fondo} alt="Imagen Inicio" />
                </div>
                <About />
                <h2>¿Qué podemos hacer en Memorial?</h2>
                <hr />
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"></li>
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"></li>
                        <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="5"></li>
                    </ol>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src={categorias} alt="Slide 1" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={medios} alt="Slide 2" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={medio} alt="Slide 3" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={notas} alt="Slide 4" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={busqueda} alt="Slide 5" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src={perfil} alt="Slide 6" />
                        </div>
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='homepage-footer'>
                <footer class='py-5'>
                    <div class='row'>
                        <div class='col-6 col-md-2 mb-3 mx-4'>
                            <h5>Sobre mí</h5>
                            <ul class='nav flex-column'>
                                <li class='nav-item mb-2'>
                                    <a href="https://gzl27.carrd.co/" class='nav-link p-0 text-body-secondary'>Carrd</a>
                                </li>                                        
                                <li class='nav-item mb-2'>
                                    <a href="https://www.linkedin.com/in/gonzalo-garc%C3%ADa-prieto-700a3020a/" class='nav-link p-0 text-body-secondary'>LinkedIn</a>
                                </li>
                                <li class='nav-item mb-2'>
                                    <a href="https://github.com/gonzalogp27" class='nav-link p-0 text-body-secondary'>Github</a>
                                </li>
                            </ul>
                        </div>
                        <div class='col-6 col-md-2 mb-3'>
                            <h5>Tecnologías</h5>
                            <ul class='nav flex-column'>
                                <li class='nav-item mb-2'>
                                    <a href="#" class='nav-link p-0 text-body-secondary'>ReactJS</a>
                                </li>                                        
                                <li class='nav-item mb-2'>
                                    <a href="#" class='nav-link p-0 text-body-secondary'>Django</a>
                                </li>
                                <li class='nav-item mb-2'>
                                    <a href="#" class='nav-link p-0 text-body-secondary'>Bootstrap</a>
                                </li>
                            </ul>
                        </div>
                        <div class='col-6 col-md-2 mb-3'>
                            <h5>Sección</h5>
                            <ul class='nav flex-column'>
                                <li class='nav-item mb-2'>
                                    <a href="#" class='nav-link p-0 text-body-secondary'>Enlace</a>
                                </li>                                        
                                <li class='nav-item mb-2'>
                                    <a href="#" class='nav-link p-0 text-body-secondary'>Enlace</a>
                                </li>
                                <li class='nav-item mb-2'>
                                    <a href="#" class='nav-link p-0 text-body-secondary'>Enlace</a>
                                </li>
                            </ul>
                        </div>
                        <div class='col-6 col-md-2 mb-3 mx-auto'>
                            <form>
                                <h5>Contáctanos</h5>
                                <p>Reporta fallos o sugerencias a Memorial</p>
                                <div class='d-flex flex-column flex-sm-row w-100 gap-2'>
                                    <input type="text" class='form-control' placeholder='Incidencia' />
                                    <button class='btn btn-light'>Enviar</button>
                                </div>

                            </form>
                        </div>

                    </div>

                    <div>

                    </div>
                </footer>
            </div>

        </div>
    )
}