const express = require('express');
const OpenApiValidator = require('express-openapi-validator');

const app = express();
const port = 3000;


app.use(
    OpenApiValidator.middleware({
        apiSpec: './openapi.yaml',
        validateRequests: true,
        validateResponses: {
            removeAdditional: 'all',
        },
    }),
);

// resquest will succeed
app.get('/', (req, res) => {
    const name = req.query.name || 'World';
    res.send({message:`Hello ${name}`});
});

// request will succeed but the field leak will be removed
// app.get('/', (req, res) => {
//     const name = req.query.name || 'World';
//     res.send({message:`Hello ${name}`, leak: 'leaked info'}); // not sure yet how to throw an error on leaked field or log it
// });

// request will fail
// app.get('/', (req, res) => {
//     const name = req.query.name || 'World';
//     res.send({breakingChange: 'breaking change'});
// });

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message,
      errors: err.errors,
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});