require('dotenv').config({
    path: require('path').resolve(__dirname, '../.env')
});
const app = require('./src/app');

const PORT = process.env.PORT_BACKEND;

app.listen(PORT, () => {
    console.log(`LuLuLeh running on ${process.env.URL_BACKEND}`);
});