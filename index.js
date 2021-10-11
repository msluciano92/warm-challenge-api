const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000

const baseURL = 'https://jsonplaceholder.typicode.com';

const paginate = (array, first, rows) => {
    return array.slice(first, rows);
}

app.get('/users', (req, res) => {
    const segment = '/users';
    const { first = 0, rows = 10 } = req.query; 
    return axios.get(`${baseURL}${segment}`)
        .then(function (response) {
            return res.send({
                users: paginate(response.data, first, rows),
                pages: Math.ceil(response.data.length / rows),
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
})

app.get('/albums', (req, res) => {
    const segment = '/albums';
    const { first = 0, rows = 10 } = req.query; 
    return axios.get(`${baseURL}${segment}`)
        .then(function (response) {
            return res.send({
                albums: paginate(response.data, first, rows),
                pages: Math.ceil(response.data.length / rows),
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})