import React from "react";
import Header from "./header/headerKids/HeaderKids";
import "./beca.css";
import FooterAdult from "./Footers/FooterAdult/FooterAdult";

function Beca() {
    return (
        <>
            <Header />
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
            <FooterAdult />
        </>
    );
}

export default Beca;
