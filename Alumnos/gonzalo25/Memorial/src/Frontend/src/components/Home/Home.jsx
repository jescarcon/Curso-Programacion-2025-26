import React, { useState } from 'react'
import fondo from '/images/home/home-img.jpg'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import About from '../About/About';

import instagram from '/images/home/ig.png'
import categorias from '/images/home/carousel/categorias.png'
import busqueda from '/images/home/carousel/busqueda.png'
import medio from '/images/home/carousel/medio.png'
import medios from '/images/home/carousel/medios.png'
import notas from '/images/home/carousel/notas.png'
import perfil from '/images/home/carousel/perfil.png'


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
                <br />
                <h2 className='text-center'>¿Qué podemos hacer en Memorial?</h2>
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
                    <div class='d-flex row flex-row-reverse w-90 ms-4 me-5'>
                        <div id="footer-info" class="col-12 col-md-6 d-flex w-50 ps-5">
                            <div class='col-6 col-md-4 mb-3'>
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

                            <div class='col-6 col-md-4 mb-3 ps-2'>
                                <h5>Tecnologías</h5>
                                <ul class='nav flex-column'>
                                    <li class='nav-item mb-2'>
                                        <a href="https://react.dev/" class='nav-link p-0 text-body-secondary'>ReactJS</a>
                                    </li>
                                    <li class='nav-item mb-2'>
                                        <a href="https://www.djangoproject.com/" class='nav-link p-0 text-body-secondary'>Django</a>
                                    </li>
                                    <li class='nav-item mb-2'>
                                        <a href="https://getbootstrap.com/" class='nav-link p-0 text-body-secondary'>Bootstrap</a>
                                    </li>
                                </ul>
                            </div>
                            <div class='col-6 col-md-4 mb-3 ps-2 d-flex justify-content-center align-items-center' style={{ minHeight: "100%" }}>
                                <a href="https://www.instagram.com/memorial_web?igsh=YmJkdGI1bGZkdXhq" target='_blank'><img src={instagram} width='100' /></a>
                            </div>
                        </div>
                        <div id='footer-contact' class='col-6 col-md-6 mb-3 w-50' >
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
                </footer>
            </div>

        </div>
    )
}