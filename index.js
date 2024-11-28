const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Simple Web Proxy</title>
        </head>
        <body>
            <h1>Web Proxy</h1>
            <form action="/proxy" method="POST">
                <label for="url">Enter URL:</label>
                <input type="text" id="url" name="url" required>
                <button type="submit">Go</button>
            </form>
        </body>
        </html>
    `);
});

// Proxy route
app.post('/proxy', async (req, res) => {
    const targetUrl = req.body.url;

    try {
        const response = await axios.get(targetUrl);
        res.status(response.status);
        res.send(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send('Error fetching the URL');
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
