const express = require('express');
const dotenv = require('dotenv');
const swaggerConfig = require('./src/config/swagger.config');
dotenv.config();
async function main() {
    const app = express();
    const PORT = process.env.PORT;
    swaggerConfig(app);
    require('./src/config/mongoose.config');
    app.listen(PORT, () => {
        console.log(`Server Is Running On PORT : ${PORT} : http://localhost:${PORT}`);
    })
}
main();