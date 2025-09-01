// backend/model/PositionsModel.js
const { model } = require("mongoose");
const { PositionsSchema } = require("../schemas/PositionsSchema");

const PositionsModel = model("Position", PositionsSchema); // 👈 use schema, not itself

module.exports = { PositionsModel };
