import React from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import Header from "../header/HeaderAdult/Header";
import "./beca.css";
import FooterAdult from "../Footers/FooterAdult/FooterAdult";

function Beca() {
    const navigate = useNavigate(); // Inicializa el hook de navegación

    // Maneja el clic del botón
    const handleQuizClick = () => {
        navigate("/Quiz"); // Redirige a la ruta "/Quiz"
    };
    return (
        <>
            <Header isWhite={true}/>
            <div className="content-container">
                <div className="left-text">
                    <h2 className="highlight-text">¡Demuestra tus habilidades y obtén una beca!</h2>
                    <p className="text-paragraph colorful-text">
                    Participa en nuestro quiz de programación para tener la oportunidad de acceder a una beca exclusiva para nuestros cursos.
                    </p>
                    <p className="text-paragraph bold-text colorful-text">
                    ¡Acepta el reto y da el siguiente paso hacia tu futuro como programador!
                    </p>
                    <button 
                    type="submit" 
                    className="submit-button"
                    onClick={handleQuizClick}/*  llama al manejador de clic */> 
                    Completa este quizz
                    </button>
                </div>
                <div className="contact-form-container">
                    <form className="contact-form">
                        <h2 className="form-title">Solicitud de Beca</h2>
                        <div className="form-group">
                            <label className="form-label">Registra tus datos para tu solicitud</label>
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
                                <input
                                    type="text"
                                    placeholder="Número de télefono a contactar"
                                    className="form-input"
                                />
                           
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