const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/api/country', (req, res) => {
    const countryName = req.query.name;
    if (!countryName) {
        return res.status(400).send('Country name is required');
    }

    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data file');
        }

        const countries = JSON.parse(data).countries;
        const country = countries.find(c => c.name.toLowerCase() === countryName.toLowerCase());

        if (!country) {
            return res.status(404).send('Country not found');
        }

        res.json(country);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});