const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThoughtById,
  deleteThought,
  addThoughtReaction,
  removeThoughtReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThoughtById)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addThoughtReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeThoughtReaction);

module.exports = router;
