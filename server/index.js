const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken");



//reading env file
require('dotenv').config(); 
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

// cors
const corsOptions = {
    origin: ['http://127.0.0.1:4200', 'http://localhost:4200'],
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// routes
const blogRoute = require('./routes/blogRoute');
const authRoute = require('./routes/authRoute');

// middleware
const authMiddleWare = (req, res, next) => {
    // Check the JWT token
    const secretKey = process.env.SECRET_KEY;
    const token = req.header('Authorization') || '';
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    const decode = jwt.decode(token, secretKey);
    console.log(decode);
    if (!decode) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
    req.user = decode;
    next();
};

const errorMiddleware = (err, req, res, next) => {
	res.status(err.status).json({ error: true, message: err.message });
};

app.use('/blogs', authMiddleWare, blogRoute);
app.use('/user', authRoute);
app.use(errorMiddleware);


// connection to local database
mongoose.connect('mongodb://localhost/blog_system').then(()=> {
    app.listen(PORT, () => {
        console.log(`Express server is running in port ${PORT}`);
    })
}).catch((err) => {
    console.log(`Error while connecting to DB`, err);
});
