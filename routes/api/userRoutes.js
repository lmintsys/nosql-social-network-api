const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUserById,
  removeUserById,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser);

router.route("/:userId").put(updateUserById);

router.route("/:userId").delete(removeUserById);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend);

router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
