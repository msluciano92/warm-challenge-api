const express = require('express')
const axios = require('axios');
const cors = require('cors')
const { paginate } = require('./helpers');

const app = express()
app.use(cors())

const port = 3000
const backendURL = 'https://jsonplaceholder.typicode.com';

app.get('/users', (req, res) => {
    const segment = '/users';
    const { first = 0, rows = 10 } = req.query; 
    return axios.get(`${backendURL}${segment}`)
        .then((response) => {
            return res.send({
                users: paginate(response.data, first, rows),
                pages: Math.ceil(response.data.length / rows),
            })
        })
        .catch(() => {
            return res.status({
                message: 'Smth goes wrong',
            })
        });
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})