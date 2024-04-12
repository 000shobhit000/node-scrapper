const mongoose = require("mongoose");

const HEADLINES = new mongoose.Schema({
  title: { type: String },
  updatedAt: { type: Date },
  paragraph: { type: String },
  source: {type: String}
});

const headlines = new mongoose.Schema(HEADLINES, {
    minimize: false,
    timestamps: true,
});

module.exports = mongoose.model("headlines", headlines);