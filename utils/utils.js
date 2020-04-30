let function_error = error => {
    res.status(500).send({
        message: 'se detecto un error',
        error: error
    });
}

module.exports = function_error