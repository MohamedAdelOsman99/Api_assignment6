const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Failed";
    if(process.env.NODE_ENV === "development") {
        sendErrorForDev(err, res)
    } else {
        sendErrorForPro(err, res);
    }
};

const sendErrorForDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error : err,
        date : new Date(),
        message : err.message,
        stack : err.stack
    });
}

const sendErrorForPro = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        date : new Date(),
        message : err.message,
    });
}

export default globalError;