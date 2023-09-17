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
    async createUser(req, res) {
        try {
            const dbUserData = await Users.create(req.body);
            res.json(dbUserData);
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}