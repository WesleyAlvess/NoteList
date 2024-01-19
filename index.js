const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require("path")
const bodyParser = require("body-parser")
const routes = require("./routes/routes")
const connectToDb = require("./database/db")

const session = require('express-session');
app.use(session({
    secret: '12345', // Substitua com uma chave secreta real
    resave: false,
    saveUninitialized: false
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
connectToDb()
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
