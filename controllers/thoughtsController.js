const { Thoughts } = require('../models/Index')

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            console.log(thoughts)
            res.json(thoughts)
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const course = await Thoughts.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!course) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(course);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thoughts.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No course with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
    
        try {
          const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async removeReaction(req, res) {
        try {
          const thought = await Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'No thought found with that ID :(' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
}