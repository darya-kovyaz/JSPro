const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskAttemptSchema = new Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    attemptsLeft: { type: Number, default: 3 },
    bestScore: { type: Number, default: 0 },
    attempts: [
        {
            attemptNumber: { type: Number, default: 0 },
            score: Number,
            timeTaken: Number,
            memoryUsed: Number,
            correct: Boolean,
        },
    ],
});

const userSchema = new Schema({
    firstName: String,
    secondName: String,
    nickname: String,
    email: String,
    password: String,
    image: String,
    role: {
        type: String,
        enum: ["admin", "viewer"],
        default: "viewer",
    },
    tasks: [taskAttemptSchema],
    totalScore: { type: Number, default: 0 },
    ratingPlace: Number,
});

const User = mongoose.model("User", userSchema);
const TaskAttempt = mongoose.model("TaskAttempt", taskAttemptSchema);
module.exports = { User, TaskAttempt };
