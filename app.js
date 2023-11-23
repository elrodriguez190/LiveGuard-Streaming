const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const faker = require('faker');

const app = express();
const port = 3000;

// HTTPS configuration
const privateKey = fs.readFileSync(path.join(__dirname, 'server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'server.cert'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

app.get('/coordenadas', (req, res) => {
    const xmin = -74.2835162176681;
    const ymin = 4.05767968609564;
    const xmax = -73.8472486683878;
    const ymax = 4.54491045358459;

    const x = faker.random.number({ min: xmin * 1e6, max: xmax * 1e6 }) / 1e6;
    const y = faker.random.number({ min: ymin * 1e6, max: ymax * 1e6 }) / 1e6;
    const temperature = faker.random.number({ min: 10, max: 30, precision: 2 });

    const coordinates = {
        name: "iss",
        id: faker.random.number(),
        latitude: parseFloat(x.toFixed(6)),
        longitude: parseFloat(y.toFixed(6)),
        altitude: faker.random.number({ min: 400, max: 500, precision: 3 }),
        velocity: faker.random.number({ min: 27000, max: 28000, precision: 3 }),
        visibility: "daylight",
        footprint: faker.random.number({ min: 4400, max: 4500, precision: 3 }),
        timestamp: Math.floor(Date.now() / 1000),
        daynum: faker.random.number({ min: 2456300, max: 2456400, precision: 3 }),
        solar_lat: faker.random.number({ min: 1, max: 2, precision: 12 }),
        solar_lon: faker.random.number({ min: 230, max: 240, precision: 12 }),
        units: "kilometers"
    };

    res.json(coordinates);
});

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start server on port 3000
httpsServer.listen(port, () => {
    console.log(`API listening at https://erodriguez.esrinosa.local:${port}`);
});
