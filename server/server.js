require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('./config/mongoose.config');

const app = express();
const port = 8000;

app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/User.routes')(app);
require('./routes/Tweet.routes')(app);


app.listen(port, () => console.log(`Server is fired up and ready to go on port ${port}`));