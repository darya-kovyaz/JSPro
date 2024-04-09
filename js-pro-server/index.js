const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const os = require("os");
const formData = require("express-form-data");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// Подключение к MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@jspro.4cr7dmj.mongodb.net/`);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to MongoDB: "));
db.once("open", function () {
    console.log("Connection to MongoDB established");
});

// Создание экземпляра Express.js
const app = express();
const routes = require("./src/api/api");
const port = 3010;

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true,
};

app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

// Запуск сервера
app.listen(port, () => {
    console.log(`The server is running on http://localhost:${port}`);
});
