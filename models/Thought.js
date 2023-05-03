const { Schema, Types, model } = require("mongoose");
const formatDate = require("../utils/formatDate");

// Schema to create reactions to thoughts
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Format the timestamp
      get: (timestamp) => formatDate(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Format the timestamp
      get: (timestamp) => formatDate(timestamp),
    },
    username: {
      type: String,
      required: true,
      ref: "User",
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactions` that gets the amount of reaction per thought
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
