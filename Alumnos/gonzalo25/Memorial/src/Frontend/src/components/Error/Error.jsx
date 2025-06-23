import './Error.css'
import logo from '/images/logo.svg'
import Navbar from '../Navbar/Navbar.jsx'

export default function Error() {
  return (
    <>
      <Navbar></Navbar>
      <section className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="text-center">
                <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                  <span className="display-1 fw-bold">Error 4</span>
                  <span className="display-1 fw-bold"><img src={logo} height='80' width='70' alt="Logo" /></span>
                  <span className="display-1 fw-bold bsb-flip-h">4</span>
                </h2>
                <h3 className="h2 mb-2">Element not found.</h3>
                <p className="mb-5">
                  Nos hemos entretenido todo lo que hemos podido, pero no hemos encontrado la página que buscas.
                </p>
                <a className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0" href="/" role="button">Volver a Memorial</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}