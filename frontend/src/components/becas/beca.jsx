import React from "react";
import Header from "../header/HeaderAdult/Header";
import "./beca.css";
import FooterAdult from "../Footers/FooterAdult/FooterAdult";

function Beca() {
    return (
        <>
            <Header isWhite={true}/>
            <div className="content-container">
                <div className="left-text">
                    <h2 className="highlight-text">¡Felicidades por pasar las pruebas!</h2>
                    <p className="text-paragraph colorful-text">
                    Regístrate para optar por la beca y disfrutar nuestros cursos. ¡Estamos emocionados de acompañarte en esta aventura de aprendizaje!
                    </p>
                    <p className="text-paragraph bold-text colorful-text">
                        ¡No pierdas esta oportunidad de alcanzar tus metas y disfrutar mientras aprendes!
                    </p>
                    <p className="text-paragraph colorful-text">
                    Nuestros cursos inspiran a los jóvenes, dándoles herramientas para explorar su creatividad y desarrollar habilidades técnicas.
                    </p>
                </div>
                <div className="contact-form-container">
                    <form className="contact-form">
                        <h2 className="form-title">Solicitud de Beca</h2>
                        <div className="form-group">
                            <label>Registra tus datos para tu solicitud</label>
                            <textarea placeholder="Nombre(s)" className="form-input"></textarea>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Apellidos(s)"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <div className="phone-number-container">
                                <input
                                    type="text"
                                    placeholder="Número de télefono a contactar"
                                    className="form-input phone-input"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="request-area" className="form-label">
                                Área de solicitud
                            </label>
                            <select id="request-area" className="form-input">
                                <option value="" disabled selected>
                                    Seleccione un área
                                </option>
                                <option value="Arte">Soporte Técnico</option>
                                <option value="Historia">Ventas</option>
                                <option value="Tecnología">Facturación</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="file" placeholder="" className="form-input" />
                        </div>
                        <button type="submit" className="submit-button">
                            Enviar Solicitud
                        </button>
                    </form>
                </div>
            </div>
            <FooterAdult />
        </>
    );
}

export default Beca;