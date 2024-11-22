const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const nodemailer = require("nodemailer");
const { text } = require('body-parser');
const { error } = require('console');

const PORT = process.env.PORT || 5000;

// Middleweare
app.use(express.static('assets'));
app.use(express.json());

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res)=>{
    console.log(req.body);
    //res.send('success');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'moraisaugusto360@gmail.com',
            pass: 'fobc uiwp zdua sdie'
        }

    })

    const mailOptions = {
        from: req.body.email,
        to: 'moraisaugusto360@gmail.com',
        subject: `Mensagem de ${req.body.email} Assunto: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=> {
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })

})

app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`)
})