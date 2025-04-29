const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const user = require('./route/userRoutes')


dotenv.config();
connectDB();

const PORT = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use('/api', user)

app.get('/', (req, res) => {
    res.status(200).send(`My first server! ${PORT}`);
});


app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}/`)
})