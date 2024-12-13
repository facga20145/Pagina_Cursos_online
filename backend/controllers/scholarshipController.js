const connection = require("../config/db.js");
const path = require("path");
const fs = require("fs"); // Importa el módulo fs

exports.addScholarshipRequest = (req, res) => {
  const { idUsuario, telefono, motivo } = req.body;
  const certificadoSocioeconomico = req.files?.CertificadoSocioeconomico;
  const certificadoEstudios = req.files?.CertificadoEstudios;

  console.log("Datos recibidos del cliente:", { idUsuario, telefono, motivo });

  // Validar que todos los campos obligatorios estén presentes
  if (!idUsuario || !telefono || !motivo) {
    console.error("Faltan datos obligatorios en la solicitud");
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  if (!certificadoSocioeconomico || !certificadoEstudios) {
    console.error("Faltan archivos obligatorios");
    return res.status(400).json({ error: "Ambos certificados son obligatorios" });
  }

  const uploadPath = "C:/xampp/htdocs/Pagina_Cursos_online/uploads/documentos";

  if (!fs.existsSync(uploadPath)) {
    console.log("Directorio de subida no encontrado, creando...");
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const socioeconomicoPath = path.join(uploadPath, certificadoSocioeconomico.name);
  const estudiosPath = path.join(uploadPath, certificadoEstudios.name);

  console.log("Guardando archivos en:", { socioeconomicoPath, estudiosPath });

  certificadoSocioeconomico.mv(socioeconomicoPath, (err) => {
    if (err) {
      console.error("Error al guardar Certificado Socioeconómico:", err);
      return res.status(500).json({ error: "Error al guardar archivo socioeconómico" });
    }

    certificadoEstudios.mv(estudiosPath, (err) => {
      if (err) {
        console.error("Error al guardar Certificado de Estudios:", err);
        return res.status(500).json({ error: "Error al guardar archivo de estudios" });
      }

      const insertQuery = `
        INSERT INTO solicitudbeca (CertificadoSocioeconomico, CertificadoEstudios, Teléfono, motivo, idUsuario, estado)
        VALUES (?, ?, ?, ?, ?, 'Pendiente')
      `;

      console.log("Ejecutando inserción en la base de datos...");
      connection.query(
        insertQuery,
        [
          `/uploads/documentos/${certificadoSocioeconomico.name}`,
          `/uploads/documentos/${certificadoEstudios.name}`,
          telefono,
          motivo,
          idUsuario,
        ],
        (err) => {
          if (err) {
            console.error("Error al insertar solicitud de beca en la base de datos:", err);
            return res.status(500).json({ error: "Error al guardar la solicitud de beca" });
          }

          console.log("Solicitud de beca guardada con éxito");
          res.status(201).json({ message: "Solicitud de beca creada con éxito" });
        }
      );
    });
  });
};
