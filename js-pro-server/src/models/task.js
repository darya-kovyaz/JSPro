const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    titleTask: {
        type: String,
        required: true,
    },
    descriptionTask: {
        type: String,
        required: true,
    },
    sectionTask: {
        type: String,
        required: true,
    },
    sectionTaskEnglish: {
        type: String,
        required: true,
    },
    maxPointsTask: {
        type: Number,
        required: true,
    },
    difficultyTask: {
        type: String,
        enum: ["Начальный", "Средний", "Продвинутый"],
        required: true,
    },
    testCaseTask: [
        {
            input: mongoose.Schema.Types.Mixed,
            expectedOutput: mongoose.Schema.Types.Mixed,
            description: String,
            _id: false,
        },
    ],
    attemptLimitTask: {
        type: Number,
        required: false,
    },
    memoryLimitTask: {
        type: Number,
        required: false,
    },
    timeLimitTask: {
        type: Number,
        required: false,
    },
    inputExampleTask_1: {
        type: String,
        required: true,
    },
    outputExampleTask_1: {
        type: String,
        required: true,
    },
    inputExampleTask_2: {
        type: String,
        required: true,
    },
    outputExampleTask_2: {
        type: String,
        required: true,
    },
    inputExampleTask_3: {
        type: String,
        required: true,
    },
    outputExampleTask_3: {
        type: String,
        required: true,
    },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
