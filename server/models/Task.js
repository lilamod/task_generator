const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    goal: {
      type: String,
      required: true,
    },

    users: {
      type: String,
      required: true,
    },

    constraints: {
      type: String,
      required: true,
    },

    template: {
      type: String,
      required: true,
    },

    risks: {
      type: String,
      default: '',
    },

    stories: [
      {
        type: String,
      },
    ],

    tasks: [
      {
        id: {
          type: Number,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        group: {
          type: String,
          default: 'General',
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
