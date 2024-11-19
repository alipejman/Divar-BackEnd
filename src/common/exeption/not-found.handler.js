function notFound(app) {
    app.use((req, res, next) => {
        res.status(404).json({
            message: 'not Found Routes',
        })
    })
}

module.exports = notFound;