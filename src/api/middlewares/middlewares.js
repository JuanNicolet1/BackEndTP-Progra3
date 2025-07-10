// Middleware para registrar en consola cada petición recibida
const loggerUrl = (req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.originalUrl}`);
    next(); // Llama al siguiente middleware o controlador
};

// Middleware para validar que el parámetro 'id' sea un número
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id)) {
        // Si el id no es un número, responde con error 400
        return res.status(400).json({ message: "El ID proporcionado no es un número válido." });
    }
    next(); // Si es válido, continúa con la petición
};

// Exporta los middlewares para usarlos en las rutas
export {
    loggerUrl,
    validateId
};


//Define funciones que se ejecutan antes de los controladores principales.
//loggerUrl sirve para ver en consola cada petición que llega (útil para debug).//
//validateId asegura que el parámetro id en la URL sea un número antes de buscarlo en la base de datos.