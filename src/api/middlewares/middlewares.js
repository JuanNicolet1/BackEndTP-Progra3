const loggerUrl = (req, res, next) => {
    console.log(`Petición recibida: ${req.method} ${req.originalUrl}`);
    next();
};

const validateId = (req, res, next) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({ message: "El ID proporcionado no es un número válido." });
    }
    next();
};

export {
    loggerUrl,
    validateId
};
    