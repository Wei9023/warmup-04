'use strict';

const express = require('express');
const superagent = require('superagent');

require('dotenv').config();

const app = express();
// app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 3000;

app.get('/', fetchPeopleWithPromises);
app.set('view engine', 'ejs');
app.get('*', (request,response) => response.status(404).send('This route does not exist'));

function handleError(err, res) {
    res.render('pages/error', {error:(err)});
}

function fetchPeopleWithPromises(request, response){
    let url ='https://swapi.co/api/people/';

    superagent.get(url)
        .then(response => response.body.results.map(nameResult => new Charactor(nameResult)))
        .then(results =>{
            response.render('index', {nameResult:results})
        })
        .catch(error => handleError(error, ))
}

function Charactor(data){
    this.name = data.name;
}

app.listen(PORT,() => console.log(`Listening on ${PORT}`));

