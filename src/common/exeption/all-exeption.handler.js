function allExeptionHandler(app) {
    app.use((err, req, res, next) => {
        let status = err?.status ?? err?.statusCode; // تغییر const به let
        if (!status || isNaN(+status) || status > 511 || status < 200) {
            status = 500; // حالا می‌توانید مقدار status را تغییر دهید
        }
        res.status(status).json({
            message: err?.message ?? err?.stack ?? 'internal server error'
        });
    });
}

module.exports = allExeptionHandler;
