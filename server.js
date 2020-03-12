const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/subscribe', (req, res) => {
    if (
        req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captcha === null
    ) {
        return res.json({ 'sucess': false, 'msg': 'Please select captcha' });
    }

    //Secret key
    const secretKey = '6Lcf3-AUAAAAAHS04prI-NQHuy8A1WMlAGIMiRQX';

    //Secret URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    //Make Request to VerifyURL
    request(verifyUrl, (err, response, body) => {
        body = JSON.parse(body)

        if (body.sucess != undefined && !body.sucess) {
            return res.json({ 'sucess': false, 'msg': ' Failed captcha verify' })
        }

        return res.json({ 'sucess': true, 'msg': ' Sucess captcha verify ' })
    })
});

app.listen(3005, () => {
    console.log('server on')
})