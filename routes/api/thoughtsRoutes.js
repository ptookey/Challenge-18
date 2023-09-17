const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtsController');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought).post(addReaction);

router.route('/:thoughtId/reactions').post(addReaction).get()

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;