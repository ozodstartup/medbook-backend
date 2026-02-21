const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: Date,
  reminded: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
