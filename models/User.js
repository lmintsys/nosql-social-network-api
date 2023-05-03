const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    username: { type: String, unique: true, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please provide a valid email address",
      ],
      required: [true, "Email required"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `friendCount` that retrieves the length of the user's friends array
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize User model
const User = model("User", userSchema);

module.exports = User;
