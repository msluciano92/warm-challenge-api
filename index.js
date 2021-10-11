const express = require('express')
const axios = require('axios');
const cors = require('cors')
const { paginate, sanitizeData } = require('./helpers');

const app = express()
app.use(cors())

const port = 3000
const backendURL = 'https://jsonplaceholder.typicode.com';

app.get('/users', (req, res) => {
    const segment = '/users';
    const { first = 0, rows = 10 } = req.query; 
    const usedKeys = ['name', 'username', 'email', 'website'];
    return axios.get(`${backendURL}${segment}`)
        .then((response) => {
            return res
                .send({
                    users: sanitizeData(paginate(response.data, first, rows), usedKeys),
                    total: response.data.length,
                })
        })
        .catch(() => {
            return res
                .status(500)
                .send({
                    message: 'Smth goes wrong',
                })
        });
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})