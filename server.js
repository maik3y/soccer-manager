const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.static('.'));

app.get('/soccer/:name', (req, res)=>{

    fetch('https://www.easports.com/fifa/ultimate-team/api/fut/item?name=' + req.params.name)
        .then(
            (res) => { return res.json()}
        )
        .then((data) => {
            console.log("data", JSON.stringify(data));
            res.header('Access-Control-Allow-Origin','*');
            res.end(JSON.stringify(data)); });

});

app.listen(8080, () => {
    console.log("listening");
});