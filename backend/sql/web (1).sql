-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-11-2024 a las 16:22:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `web`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `consultarCliente` (IN `p_email` VARCHAR(50))   BEGIN
    SELECT * 
    FROM usuario 
    WHERE email = p_email;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarCliente` (IN `p_Nombre` VARCHAR(30), IN `p_Apellido` VARCHAR(45), IN `p_FechaNacimiento` DATE, IN `p_Genero` ENUM('Masculino','Femenino'), IN `p_Email` VARCHAR(50), IN `p_Contrasena` VARCHAR(255))   BEGIN
    INSERT INTO usuario (
        Nombre,
        Apellido,
        FechaNacimiento,
        Genero,
        email,
        Contrasena,
        Rol
    ) VALUES (
        p_Nombre,
        p_Apellido,
        p_FechaNacimiento,
        p_Correo,
        p_Email,
        p_Contrasena,
        'cliente'
    );
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `IdArea` int(11) NOT NULL,
  `NombreArea` varchar(20) NOT NULL,
  `FechaCreacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `beca`
--

CREATE TABLE `beca` (
  `idBeca` int(11) NOT NULL,
  `idPlanEstudio` int(11) NOT NULL,
  `tipoBeca` enum('Parcial','Completa') NOT NULL,
  `descuento` float NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `Activo` bit(1) DEFAULT b'1',
  `idSolicitudBeca` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `NombreCategoria` varchar(45) NOT NULL,
  `FechaCreacion` date NOT NULL,
  `IdArea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `idCurso` int(11) NOT NULL,
  `nombre_curso` varchar(30) NOT NULL,
  `descripcion` mediumtext DEFAULT NULL,
  `precio` float NOT NULL,
  `duracion` char(5) NOT NULL,
  `ClasificacionEdad` enum('Niño','Joven','Adulto') NOT NULL,
  `Enlace` varchar(100) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `idPago` int(11) NOT NULL,
  `idTipoPago` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idCurso` int(11) DEFAULT NULL,
  `fechaPago` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `planestudio`
--

CREATE TABLE `planestudio` (
  `idPlanEstudio` int(11) NOT NULL,
  `nombre_plan` varchar(30) NOT NULL,
  `precio` float NOT NULL,
  `cantidadUsuarios` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progresocurso`
--

CREATE TABLE `progresocurso` (
  `idUsuario` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `Progreso` enum('adquirido','en proceso','finalizado') NOT NULL DEFAULT 'adquirido',
  `fechaInicio` date NOT NULL,
  `fecha_actualizacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudbeca`
--

CREATE TABLE `solicitudbeca` (
  `idSolicitudBeca` int(11) NOT NULL,
  `CertificadoSocioeconomico` varchar(45) NOT NULL,
  `CertificadoEstudios` varchar(45) NOT NULL,
  `Teléfono` char(15) NOT NULL,
  `motivo` varchar(100) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `estado` enum('Aceptado','Rechazado') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripción`
--

CREATE TABLE `suscripción` (
  `idSuscripción` int(11) NOT NULL,
  `idPago` int(11) NOT NULL,
  `idPlanEstudio` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `estado` bit(1) DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipopago`
--

CREATE TABLE `tipopago` (
  `idTipoPago` int(11) NOT NULL,
  `Nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `Nombre` varchar(30) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `FechaNacimiento` date NOT NULL,
  `Genero` enum('Masculino','Femenino') NOT NULL,
  `email` varchar(50) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Rol` enum('cliente','superadministrador','administrador','docente') NOT NULL,
  `Estado` bit(1) NOT NULL DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`IdArea`),
  ADD UNIQUE KEY `NombreArea_UNIQUE` (`NombreArea`);

--
-- Indices de la tabla `beca`
--
ALTER TABLE `beca`
  ADD PRIMARY KEY (`idBeca`),
  ADD KEY `fk_Beca_PlanEstudio` (`idPlanEstudio`),
  ADD KEY `fk_Beca_SolicitudBeca` (`idSolicitudBeca`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`),
  ADD KEY `fk_Categoria_Area` (`IdArea`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`idCurso`),
  ADD KEY `fk_Curso_Usuario` (`idUsuario`),
  ADD KEY `fk_Curso_Categoria` (`idCategoria`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`idPago`),
  ADD KEY `fk_Pago_TipoPago` (`idTipoPago`),
  ADD KEY `fk_Pago_Usuario` (`idUsuario`),
  ADD KEY `fk_Pago_Curso` (`idCurso`);

--
-- Indices de la tabla `planestudio`
--
ALTER TABLE `planestudio`
  ADD PRIMARY KEY (`idPlanEstudio`);

--
-- Indices de la tabla `progresocurso`
--
ALTER TABLE `progresocurso`
  ADD PRIMARY KEY (`idUsuario`,`idCurso`),
  ADD KEY `fk_ProgresoCurso_Curso` (`idCurso`);

--
-- Indices de la tabla `solicitudbeca`
--
ALTER TABLE `solicitudbeca`
  ADD PRIMARY KEY (`idSolicitudBeca`),
  ADD UNIQUE KEY `CertiEstudios_UNIQUE` (`CertificadoEstudios`),
  ADD UNIQUE KEY `CertiSocioeconomico_UNIQUE` (`CertificadoSocioeconomico`),
  ADD KEY `fk_SolicitudBeca_Usuario` (`idUsuario`);

--
-- Indices de la tabla `suscripción`
--
ALTER TABLE `suscripción`
  ADD PRIMARY KEY (`idSuscripción`),
  ADD KEY `fk_Suscripción_Pago` (`idPago`),
  ADD KEY `fk_Suscripción_PlanEstudio1` (`idPlanEstudio`),
  ADD KEY `fk_Suscripción_Usuario1` (`idUsuario`);

--
-- Indices de la tabla `tipopago`
--
ALTER TABLE `tipopago`
  ADD PRIMARY KEY (`idTipoPago`),
  ADD UNIQUE KEY `Nombre_UNIQUE` (`Nombre`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `Correo_UNIQUE` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `IdArea` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `idPago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `planestudio`
--
ALTER TABLE `planestudio`
  MODIFY `idPlanEstudio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipopago`
--
ALTER TABLE `tipopago`
  MODIFY `idTipoPago` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `beca`
--
ALTER TABLE `beca`
  ADD CONSTRAINT `fk_Beca_PlanEstudio` FOREIGN KEY (`idPlanEstudio`) REFERENCES `planestudio` (`idPlanEstudio`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Beca_SolicitudBeca` FOREIGN KEY (`idSolicitudBeca`) REFERENCES `solicitudbeca` (`idSolicitudBeca`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `fk_Categoria_Area` FOREIGN KEY (`IdArea`) REFERENCES `area` (`IdArea`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `curso`
--
ALTER TABLE `curso`
  ADD CONSTRAINT `fk_Curso_Categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Curso_Usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `fk_Pago_Curso` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Pago_TipoPago` FOREIGN KEY (`idTipoPago`) REFERENCES `tipopago` (`idTipoPago`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Pago_Usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `progresocurso`
--
ALTER TABLE `progresocurso`
  ADD CONSTRAINT `fk_ProgresoCurso_Curso` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ProgresoCurso_Usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `solicitudbeca`
--
ALTER TABLE `solicitudbeca`
  ADD CONSTRAINT `fk_SolicitudBeca_Usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `suscripción`
--
ALTER TABLE `suscripción`
  ADD CONSTRAINT `fk_Suscripción_Pago` FOREIGN KEY (`idPago`) REFERENCES `pago` (`idPago`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Suscripción_PlanEstudio1` FOREIGN KEY (`idPlanEstudio`) REFERENCES `planestudio` (`idPlanEstudio`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Suscripción_Usuario1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
