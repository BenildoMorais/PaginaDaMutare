const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config()

const nodemailer = require("nodemailer");
const { text } = require('body-parser');
const { error } = require('console');

const PORT = process.env.PORT || 9000;

// Middleweare
app.use(express.static('assets'));
app.use(express.json());

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res)=>{
    //console.log(req.body);
    //res.send('success');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL_PASS
        }

    })

    const mailOptions = {
        from: req.body.email,
        to: process.env.USER_EMAIL,
        subject: `Mensagem de ${req.body.email} Assunto: ${req.body.subject}`,
        text: req.body.message
    }

    const mailOptionsClient = {
        from: req.body.email,
        to: req.body.email,
        subject: 'Mutare Soluções',
        text: `Saudações ${req.body.name}, recebemos o seu Email e responderemos em breve`
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

    transporter.sendMail(mailOptionsClient, (error, info)=> {
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