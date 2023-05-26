const  mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailOrPhone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
