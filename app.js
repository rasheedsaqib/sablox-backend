const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
const multer = require('multer');
require('dotenv').config();

//routes imported
const AuthRoutes = require('./routes/auth.routes');
const CategoryRoutes = require('./routes/category.routes');
const PostRoutes = require('./routes/post.routes');
const CommentRoutes = require('./routes/comment.routes');
const ConstantRoutes = require('./routes/constants.routes');

//app defined
const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const name = (+ new Date() + '.' + file.originalname.split('.').at(-1)).replace(' ', '');
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//app uses
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/api/', AuthRoutes);
app.use('/api/', CategoryRoutes);
app.use('/api/', PostRoutes);
app.use('/api/', CommentRoutes);
app.use('/api/', ConstantRoutes);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

//db connection
mongoose.connect(process.env.DB)
    .then(() => {
        app.listen(8080, ()=>{
            console.log('Server started at port 8080');
        });
    })
    .catch(err => {
        console.log(err);
    });