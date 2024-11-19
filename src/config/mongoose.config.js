const {default: mongoose} = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DB_URL).then(() => {
    console.log(`Conected To MongoDb`);
}).catch((err) => {
    console.log(err?.message || 'Failed To Connected Database');
})