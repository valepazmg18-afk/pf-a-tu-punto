
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const carpetaImagenes = path.join(__dirname, "../uploads/productos");

// Crear la carpeta automáticamente si no existe
fs.mkdirSync(carpetaImagenes, { recursive: true });

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carpetaImagenes);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const nombreArchivo = `producto-${Date.now()}${extension}`;

    cb(null, nombreArchivo);
  },
});

const filtroImagenes = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos de imagen."));
  }
};

const upload = multer({
  storage: almacenamiento,
  fileFilter: filtroImagenes,
  limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = upload;
