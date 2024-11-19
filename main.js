const express = require('express');
const dotenv = require('dotenv');
const swaggerConfig = require('./src/config/swagger.config');
const mainRouter = require('./src/app.routes'); 
const notFound = require('./src/common/exeption/not-found.handler');
const allExeptionHandler = require('./src/common/exeption/all-exeption.handler');

dotenv.config();

async function main() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const PORT = process.env.PORT;

    swaggerConfig(app);

    app.use(mainRouter);

    require('./src/config/mongoose.config');
    notFound(app);
    allExeptionHandler(app);
    app.listen(PORT, () => {
        console.log(`Server Is Running On PORT : ${PORT} : http://localhost:${PORT}`);
    });
}

main();
