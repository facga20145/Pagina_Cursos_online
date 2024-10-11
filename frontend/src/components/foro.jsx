import "./foro.css";

const Foro = () => {
    return (
      <section className="foro-section">
        {/* Header del foro */}
        <div className="foro-header">
          <h1>Foros de GuímarBot</h1>
          <p>Comparte y discute sobre temas de programación, diseño, marketing, video, startups y negocios.</p>
          <div className="foro-search">
            <input type="text" placeholder="Buscar una discusión" />
            <button className="search-button">Buscar</button>
          </div>
        </div>
  
        {/* Input para escribir un comentario */}
        <div className="comment-input">
          <textarea
            placeholder="Escribe tu comentario"
            className="comment-textarea"
          />
          <button className="comment-button">
            Enviar
          </button>
        </div>
  
        {/* Filtro de discusiones */}
        <div className="filter-section">
          <span>Discusiones ordenadas por:</span>
          <select className="filter-select">
            <option value="mejores">Mejores</option>
            <option value="nuevas">Nuevas</option>
            <option value="top">Top</option>
          </select>
        </div>
  
        {/* Cuerpo del foro */}
        <div className="foro-body">
          <div className="foro-discussions">
            {/* Primera discusión */}
            <div className="discussion-card">
              <div className="discussion-votes">
                <span>7</span>
              </div>
              <div className="discussion-content">
                <div className="discussion-header">
                  <p className="discussion-category">Portada</p>
                  <h3>¿Qué es lo que más les gusta de la comunidad de GuímarBot y por qué?</h3>
                  <div className="author-info">
                    <p className="author">estefanycss</p>
                    <span>• 3786 puntos</span>
                    <span>• hace 7 meses</span>
                  </div>
                </div>
                <div className="discussion-footer">
                  <p className="comments">7 comentarios</p>
                  <button className="tag">Desarrollo e Ingeniería</button>
                </div>
              </div>
            </div>
  
            {/* Segunda discusión */}
            <div className="discussion-card">
              <div className="discussion-votes">
                <span>1</span>
              </div>
              <div className="discussion-content">
                <div className="discussion-header">
                  <h3>Ya vamos con NET 8, ¿Cuándo vamos a tener una actualización de este curso?</h3>
                  <div className="author-info">
                    <p className="author">CristianLi</p>
                    <span>• 9946 puntos</span>
                    <span>• hace 1 mes</span>
                  </div>
                </div>
                <div className="discussion-footer">
                  <p className="comments">5 comentarios</p>
                  <button className="tag">Desarrollo e Ingeniería</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Foro;