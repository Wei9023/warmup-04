'use strict';

const superagent = require('superagent');

const swapi = 'http://swapi.co/api/people/';

const fetchPeopleWithPromises = () => {
    return superagent.get(swapi)
    .then( data => {
        console.log(data.body);
        return data.body.results.map( person => {
            console.log(person.name, person.url);
            return superagent.get(person.url);
        })
    })
    .then( peolpeRequests => {
        console.log( peopleRequests);
        return Promise.all(peolpeRequests)
            .then( people => {
                console.log(people);
                let names = [];
                for( let person of people) {
                    names.push(person.body.name);
                }
                return names;
            })
    })
}

const fetchPeopleWithAsync = async () => {
    let peopleSet = await superagent.get(swapi);
    const people = peopleSet.body.results || [];
    console.log(people);

    const peopleRequests = people.map( person => {
        return superagent.get( person.url );
    });

    const names = await Promise.all( peopleRequests)
        .then( people => {
            let names =[];
            for( let person of people) {
                names.push( person.name );
            }
            return names;
        })
        return names;
}



fetchPeopleWithPromises()
    .then( people => console.log(people));

fetchPeopleWithAsync()
    .then( people => console.log(people));