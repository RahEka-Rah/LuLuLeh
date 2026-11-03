require('dotenv').config({
    path: require('path').resolve(__dirname, '../.env')
});
const app = require('./src/app');

const PORT = 5173;

app.listen(PORT, () => {
    console.log(`LuLuLeh running on http://localhost:${PORT}`);
});