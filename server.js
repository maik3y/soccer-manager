const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 8080;

app.use(express.static('.'));
app.get('/player/:name', (req, res) => {

    if (req.params.name.length > 0) {
        try {
            fetch('https://www.easports.com/fifa/ultimate-team/api/fut/item?name=' + req.params.name)
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.end(JSON.stringify(data));
                });
        } catch (e) { }
    }

});

app.listen(port, () => {
    console.log("listening on port:"+ port);
});