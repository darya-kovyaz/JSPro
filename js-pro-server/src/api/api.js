const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const url = require("url");

const fs = require("fs");
const path = require("path");
require("dotenv").config();

const User = require("../models/user");
const Task = require("../models/task");

const secretKey = process.env.SECRET_KEY;

const saltRounds = 10;

router.get("/", (req, res) => {
    res.send("The server is running");
});

const checkEmailExists = async (email) => {
    try {
        const userByEmail = await User.findOne({ email: email }).lean();
        return userByEmail;
    } catch (error) {
        console.error("Error checking email existence: ", error);
        return;
    }
};

const checkNicknameExists = async (nickname) => {
    try {
        if (!nickname) return false;
        const userByNickname = await User.findOne({ nickname: nickname }).lean();
        return userByNickname;
    } catch (error) {
        console.error("Error checking nickname existence: ", error);
        return;
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await checkEmailExists(email);

        if (user) {
            const matchPass = bcrypt.compare(password, user.password);
            if (matchPass) {
                //const tokenTimestamp = Math.floor(Date.now() / 1000);
                const token = jwt.sign({ userId: user._id, userRole: user.role }, secretKey, { expiresIn: "1h" });

                return res.json({ userExists: true, message: "Login successful", token });
            } else {
                return res.status(400).json({ userExists: true, success: false, message: "Invalid password" });
            }
        }
        return res.status(400).json({ userExists: false, message: "User does not exist" });
    } catch (error) {
        console.error("Error logging in user: ", error);
        return res.status(500).json({ success: false, message: "Error logging in user" });
    }
});

router.post("/signUp", async (req, res) => {
    const { secondName, firstName, nickname, email, password } = req.body;

    const emailExists = await checkEmailExists(email);
    if (emailExists) {
        return res.status(409).send("Email already in use");
    }

    const nicknameExists = await checkNicknameExists(nickname);
    if (nicknameExists) {
        return res.status(409).send("Nickname already taken");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            firstName,
            secondName,
            nickname,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id, userRole: newUser.role }, secretKey, { expiresIn: "1h" });

        console.log("New user added successfully");
        res.status(201).json({ message: "New user added successfully", token: token });
    } catch (error) {
        console.error("Error saving data: ", error);
        res.status(500).send("Error saving data");
    }
});

router.get("/getUserData", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(400).send("User not found");
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Error fetching user data");
    }
});

router.get("/getUsersData", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.error("Error fetching users: ", error);
        res.status(500).send("Error fetching users");
    }
});

router.post("/uploadPhoto", verifyToken, async (req, res) => {
    try {
        const userId = req.body?.userId;
        const userNickname = req.body?.userNickname;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const tempFilePath = req.files.image.path;
        const folderPath = path.join(__dirname, "../../images");

        const uniqueFileName = `user_${userNickname}.jpg`;

        const fileData = fs.readFileSync(tempFilePath);
        fs.writeFileSync(path.join(folderPath, uniqueFileName), fileData);

        user.image = uniqueFileName;
        await user.save();

        res.status(200).send("File uploaded successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error uploading file");
    }
});

router.get("/getImage", async (req, res) => {
    try {
        const parsedURL = url.parse(req.url, true);
        const imgName = parsedURL.query.imgName;

        const imagePath = path.join(__dirname, "../../images", imgName);
        res.sendFile(imagePath);
    } catch (error) {
        console.error(error);
    }
});

router.get("/get", async (req, res) => {
    const data = await User.findOne();
    res.send(data);
});

module.exports = router;
