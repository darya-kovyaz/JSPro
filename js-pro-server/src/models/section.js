const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sectionSchema = new Schema({
    titleSection: { type: String, required: true },
});

const Section = mongoose.model("Section", sectionSchema);
module.exports = Section;
