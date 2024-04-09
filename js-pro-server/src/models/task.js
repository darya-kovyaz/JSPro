const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    maxPoints: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    testCases: [
        {
            input: Schema.Types.Mixed,
            expectedOutput: Schema.Types.Mixed,
            _id: false,
        },
    ],
    gradingCriteria: [
        {
            criterion: String,
            description: String,
            points: Number,
            _id: false,
        },
    ],
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
