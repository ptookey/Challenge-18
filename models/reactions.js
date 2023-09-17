const mongoose = require('mongoose');

const reactionsSchema = new mongoose.Schema({
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
          if (date) return date.toISOString().split("T") [0];
        },
      },
  });

  module.exports = reactionsSchema;