const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUserData,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUserData).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;