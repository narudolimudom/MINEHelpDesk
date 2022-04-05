// import
require('dotenv').config();
const express = require('express')
const moongoose = require('mongoose')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static('uploads'));

//databae connection
moongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true})
    .then(() => {console.log('connected to the database')})
    .catch(err => {console.log(err)})

    //routes prefix
app.use("/api/post", require('./routes/routes'))


//statrt server
app.listen(port, () => 
{console.log('server running at http://localhost:'+port);})