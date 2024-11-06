const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  number: {
    type: Number,
    required: true,
  },
});
mongoose.set("strictQuery", true);
mongoose.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

mongoose.connect(process.env.MONGODB_URI).then(() => {});
module.exports = mongoose.model("Person", PersonSchema);
