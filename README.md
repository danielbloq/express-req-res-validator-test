Hello 👋

This is a simple repo to test how the express-openapi-validator lib works.

Just comment and uncomment the following lines in the index.js to test the different cases

```
// resquest will succeed
app.get('/', (req, res) => {
    const name = req.query.name || 'World';
    res.send({message:`Hello ${name}`});
});

// request will succeed but the field leak will be removed
// app.get('/', (req, res) => {
//     const name = req.query.name || 'World';
//     res.send({message:`Hello ${name}`, leak: 'leaked info'});
// });

// request will fail
// app.get('/', (req, res) => {
//     const name = req.query.name || 'World';
//     res.send({breakingChange: 'breaking change'});
// });
```

To run:

1. `npm i`
2. `npm run dev`
