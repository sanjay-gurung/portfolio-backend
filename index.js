const express = require('express');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/api/form', cors(), async (req, res, next) => {
    try {
        let transporter = nodeMailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
                user: 'jaiden72@ethereal.email',
                pass: 'fd1Zzn1ySQYag57kaP'
            }
        });
    
        let mailOptions = {
            from: req.body.email,
            to: "jaiden72@ethereal.email",
            subject: req.body.subject,
            html: ` 
                <h3>Email Information</h3>
                <ul>
                    <li>Name: ${req.body.name}</li>
                    <li>Email: ${req.body.email}</li>
                </ul>
                <h3>Message</h3>
                <p>${req.body.message}</p>
                
                `
        }
    
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err.message);
                res.send(error);
            } else {
                console.log(info);
                res.send(info);
            }
    
        });
    
        transporter.close();

    } catch(err) {
        next(err);
    }
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
});