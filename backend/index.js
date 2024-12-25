//----------------- Importing Modules -----------------
const express = require('express')
const connectToMongoose = require('./db.js');
const cors = require('cors');

// ----------------- Connecting to Mongoose -----------------
connectToMongoose();
const app = express()
const port = 4000

// ----------------- Importing Middlewares -----------------
// To Send JSON Data as a response.
app.use(cors());
app.use(express.json())

// ----------------- Importing Routes -----------------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// ----------------- Listening to the server -----------------
app.listen(port, () => {
    console.log(`iNotebook listening on port ${port}`)
})



// In JS things don't get executed in order instead it works on the principle of event loop. So the connectToMongoose() function will be executed after the app.listen() function. So you need to move the connectToMongoose() function above the app.listen() function.