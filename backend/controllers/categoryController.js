const Category = require('../models/categoryModel')

function getAllCategories(req, res, next) {
  Category
    .find()
    .populate('trips-in-category')
    .then(categories => res.status(200).json(categories))
    .catch(next)
}

function getCategory(req, res, next) {
  Category
    .findById(req.params.id)
    .populate('trips-in-category')
    .then(category => category ? res.status(200).json(category) : new Error('Not found'))
    .catch(next)
}

function likeCategory(req, res, next) {
  Category
    .findById(req.params.id)
    .then(category => {
      if (!category) throw new Error('Not found')
      if (category.likes.some(item => item.user._id.equals(req.currentUser._id))) {
        const foundLike = category.likes.find(item => item.user._id.equals(req.currentUser._id))
        category.likes.splice(category.likes.indexOf(foundLike), 1)
        return category.save()
      }
      category.likes.push({ user: req.currentUser })
      return category.save()
    })
    .then(category => res.status(202).json(category))
    .catch(next)
}

module.exports = { getAllCategories, getCategory, likeCategory }