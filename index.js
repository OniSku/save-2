const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodypaser = require('body-parser')
const connectDB = require('./server/database/connection')
const app = express();
const path = require('path');
const exp = require('constants');
dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080;

app.use(morgan('tiny'))

connectDB()

app.use(bodypaser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views',path.resolve(__dirname,"views/ejs"))

app.use('/css', express.static('assets/css'));
app.use('/js',express.static('assets/js'));
app.use('/img',express.static('assets/img'))

app.use('/', require('./server/routes/routes'))

// app.get('/',(req,res)=>{
//     res.send('Crud приложение')
// })

app.listen(PORT,()=>{
    console.log('сервер запущен на '+ PORT +' порту')
})