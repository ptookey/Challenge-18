const { Users } = require('../models/Index')

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await Users.find();
            console.log(users)
            res.json(users)
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await Users.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await Users.create(req.body);
            res.json(dbUserData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUserData(req, res) {
        console.log('You are updating user data');
        console.log(req.body);
    
        try {
          const user = await Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    async deleteUser(req, res) {
        try {
          const user = await Users.findOneAndDelete({ _id: req.params.userId });
    
          if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
          }
    
          await Users.deleteMany({ _id: { $in: user.thoughts } });
          res.json({ message: 'User & thoughts deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
    
        try {
          const user = await Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async removeFriend(req, res) {
        try {
          const user = await Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
}