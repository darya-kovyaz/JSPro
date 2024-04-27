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
const Section = require("../models/section");

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
            const matchPass = await bcrypt.compare(password, user.password);
            if (matchPass) {
                //const tokenTimestamp = Math.floor(Date.now() / 1000);
                const token = jwt.sign({ userId: user._id, userRole: user.role }, secretKey, {
                    expiresIn: "1h",
                });

                return res.json({ userExists: true, name: user.firstName, message: "Login successful", token });
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
        res.status(201).json({ message: "New user added successfully", name: newUser.firstName, token: token });
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

router.post("/addSection", async (req, res) => {
    const { titleSection, titleSectionEnglish } = req.body;
    try {
        const lastSection = await Section.findOne().sort({ indexSection: -1 });
        const newIndex = lastSection ? lastSection.indexSection + 1 : 0;

        const section = new Section({
            titleSection,
            titleSectionEnglish,
            indexSection: newIndex,
        });

        await section.save();

        console.log("New section added with index " + newIndex);
        res.status(201).json({ message: "New section added successfully", indexSection: newIndex });
    } catch (error) {
        console.error("Error saving data: ", error);
        res.status(500).send("Error saving data");
    }
});

router.get("/getSections", async (req, res) => {
    try {
        const sections = await Section.find();
        res.json(sections);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/updateSectionIndex", async (req, res) => {
    try {
        const { id, newIndex } = req.body;
        await Section.findByIdAndUpdate(id, { indexSection: newIndex });

        res.status(200).send("Index updated successfully.");
    } catch (error) {
        res.status(500).send("Error updating index: " + error.message);
    }
});

router.delete("/deleteSection/:id", async (req, res) => {
    try {
        const section = await Section.findByIdAndDelete(req.params.id);
        if (!section) {
            throw new Error("No section found");
        }
        res.status(200).send(`Section ${req.params.id} deleted`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/addTask", async (req, res) => {
    const {
        titleTask,
        sectionTask,
        sectionTaskEnglish,
        difficultyTask,
        maxPointsTask,
        attemptLimitTask,
        memoryLimitTask,
        timeLimitTask,
        descriptionTask,
        inputExampleTask_1,
        outputExampleTask_1,
        inputExampleTask_2,
        outputExampleTask_2,
        inputExampleTask_3,
        outputExampleTask_3,
        testCaseTask,
    } = req.body;
    console.log(req.body);
    try {
        const task = new Task({
            titleTask,
            sectionTask,
            sectionTaskEnglish,
            difficultyTask,
            maxPointsTask,
            attemptLimitTask,
            memoryLimitTask,
            timeLimitTask,
            descriptionTask,
            inputExampleTask_1,
            outputExampleTask_1,
            inputExampleTask_2,
            outputExampleTask_2,
            inputExampleTask_3,
            outputExampleTask_3,
            testCaseTask,
        });

        task.markModified("testCaseTask");
        await task.save();

        console.log("New task added");
        res.status(201).json({ message: "New task added successfully" });
    } catch (error) {
        console.error("Error saving data: ", error);
        res.status(500).send("Error saving data");
    }
});

router.get("/getTask/:taskSection/:id", async (req, res) => {
    try {
        const { id, taskSection } = req.params;
        const task = await Task.findOne(
            { _id: id, sectionTaskEnglish: taskSection },
            {
                sectionTask: 1,
                sectionTaskEnglish: 1,
                titleTask: 1,
                descriptionTask: 1,
                attemptLimitTask: 1,
                difficultyTask: 1,
                inputExampleTask_1: 1,
                outputExampleTask_1: 1,
                inputExampleTask_2: 1,
                outputExampleTask_2: 1,
                inputExampleTask_3: 1,
                outputExampleTask_3: 1,
                memoryLimitTask: 1,
                timeLimitTask: 1,
                testCaseTask: 1,
            }
        );
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/getTaskTitle", async (req, res) => {
    try {
        const task = await Task.find({}, { titleTask: 1 });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/getAllTasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/nextTask/:taskSection/:id", async (req, res) => {
    try {
        const { taskSection, id: currentId } = req.params;

        const currentTask = await Task.findOne({ _id: currentId, sectionTaskEnglish: taskSection });
        if (!currentTask) {
            return res
                .status(404)
                .send({ message: "Current task not found or does not belong to the specified section" });
        }

        const nextTask = await Task.findOne({
            sectionTaskEnglish: taskSection,
            _id: { $gt: currentId },
        })
            .sort({ _id: 1 })
            .limit(1);

        if (!nextTask) {
            return res.status(404).send({ message: "No next task available in the specified section" });
        }

        res.json(nextTask);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get("/lastTask/:taskSection", async (req, res) => {
    try {
        const { taskSection } = req.params;
        const lastTask = await Task.findOne({ sectionTaskEnglish: taskSection }).sort({ _id: -1 });
        if (!lastTask) {
            return res.status(404).send({ message: "No tasks found" });
        }
        res.json(lastTask);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            throw new Error("No section found");
        }
        res.status(200).send(`Task ${req.params.id} deleted`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
