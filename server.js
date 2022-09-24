const express = require('express');
const db = require('./db/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Use routes
app.use('/api', routes);

//Catch-All response
app.use((req,res) => {
    res.status(404).end();
})

db.connect(err => {
    if (err) throw err;
    console.log('Database Connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});