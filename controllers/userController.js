const User = require("../models/User");

module.exports = {
  // View all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // View one user by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update user by id
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  // Delete user by id
  async deleteUser(req, res) {
    try {
      const removedUser = await User.findOneAndRemove({
        _id: req.params.userId,
      });

      if (!removedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User removed successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  // Add friend to a user
  async addFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      // Check if the user and friend exist
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
      console.log(user);
      console.log(friend);
      if (!user || !friend) {
        return res.status(404).json({ message: "User or friend not found" });
      }

      // Check if the friend is already in the user's friend list
      if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: "Friend already added" });
      }

      // Add the friend to the user's friend list
      user.friends.push(friendId);
      await user.save();

      res.json({ message: "Friend added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  // Delete a friend
  async deleteFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const friendIndex = user.friends.findIndex(
        (f) => f.toString() === friendId
      );

      if (friendIndex === -1) {
        return res.status(404).json({ message: "Friend not found" });
      }

      user.friends.splice(friendIndex, 1);

      await user.save();

      res.status(200).json({ message: "Friend successfully deleted!", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
