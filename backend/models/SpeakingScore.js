const mongoose = require("mongoose");


const speakingSchema = new mongoose.Schema({
    userId:String,
    score:Number,
    date:Date,
});

module.exports = mongoose.model("SpeakingScore",speakingSchema);