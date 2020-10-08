const express = require("express")
const app = express()

const faker = require("faker")
const path = require('path');
const dotenv = require("dotenv")

dotenv.config()

const mysqlConnection = require("./config/database")

const port = process.env.PORT || 3001

app.post("/api/urls", (req, res) =>
{    
    mysqlConnection.query(`SELECT * FROM urls WHERE original_url='${req.query.url}'`, (err, rows) =>
    {
        if (err) res.sendStatus(400) // Bad Request

        if (rows.length === 0) {
            generateUniqueShortUrl((shortUrl) =>
            {
                mysqlConnection.query(`INSERT INTO urls (original_url, short_url) VALUES ('${req.query.url}', '${shortUrl}')`, (err) =>
                {
                    if (err) res.sendStatus(400) // Bad Request

                    res.json(shortUrl)
                })
            })
        }
        else { // Responds with a shprt url that was already generated for that url
            res.json(rows[0].short_url)
        }
    })
})

app.get("/api/urls/:urlWords", (req, res) =>
{
    let urlWords = req.params.urlWords.toLowerCase()

    mysqlConnection.query(`SELECT * FROM urls WHERE short_url='${urlWords}'`, (err, rows) =>
    {
        if (err) {
            res.sendStatus(400) // Bad Request
            return;
        }

        if (rows.length === 0) {
            res.json()
            return;
        }

        res.json("http://" + rows[0].original_url)
    })
})

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static build
    app.use(express.static("public/build"))

    app.get("*", (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, "public", "build", "index.html"))
    })
}

// Generates a short url that isn't already in the database
function generateUniqueShortUrl(callback)
{
    let shortUrl = ""

    for (let i = 0; i < 3; i++) {
        shortUrl += faker.random.word().toLowerCase() + "-"
    }
    shortUrl = shortUrl.substring(0, shortUrl.length - 1);

    mysqlConnection.query(`SELECT * FROM urls WHERE short_url='${shortUrl}'`, (err, rows) => // Looks for any URL that is already using that short url
    {
        if (err) return err; // Bad Request

        if (rows.length !== 0) {
            return generateUniqueShortUrl();
        }
        else {
            return callback(shortUrl)
        }
    })
}

app.listen(port)

// Todo
// Todo - Make pages nice for the error, redirection and notfound page
// TODO - The error message on the recently generated urls is not very good looking.

//! Fix
//! - There is currently an issue in the deployment build where if you type https://urlwords.dreamhosters.com// there is a white screen.

//! Some issues I had
//! CORS was disallowing me to redirect the user by sending a GET request from the front to this server and redirecting from the GET request.
//! I completely forgot to import path and spent hours wondering why client-routing wasn't working.
//! If there is an error when building the deployment build, then I should probably fix them as they can cause strange issues. 
