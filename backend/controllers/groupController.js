const Group = require('../models/groupModel')

function getGroup(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('members.user')
    .populate('comments.user')
    .then(travelGroup => travelGroup ? res.status(200).json(travelGroup) : res.status(404).json({ message: 'Error 404 - Groups Not Found' }))
    .catch(next)
}

function getAllGroups(req, res, next) {
  Group
    .find()
    .populate('members.user')
    .populate('comments.user')
    .then(travelGroups => travelGroups ? res.status(200).json(travelGroups) : res.status(404).json({ message: 'Error 404 - Groups not found' }))
    .catch(next)
}

function createGroup(req, res, next) {
  Group
    .create(req.body)
    .then(newGroup => {
      newGroup.members.push({ user: req.currentUser })
      return newGroup.save()
    })
    .then(newGroup => res.status(201).json(newGroup))
    .catch(next)
}

function updateGroup(req, res, next) {
  Group
    .findById(req.params.id)
    .then(group => {
      if (!group.members.some(item => item.user._id.equals(req.currentUser._id))) throw new Error('Unauthorized')
      Object.assign(group, req.body)
      return group.save()
    })
    .then(updatedGroup => res.status(202).json(updatedGroup))
    .catch(next)
}

function deleteGroup(req, res, next) {
  Group
    .findById(req.params.id)
    .then(group => {
      if (!group) throw new Error('Not found')
      if (!group.members[0].user._id.equals(req.currentUser._id)) throw new Error('Unauthorized')
      group.remove().then(() => res.sendStatus(204))
    })
    .catch(next)
}

// Join or Follow

function joinGroup(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('members.user')
    .then(group => {
      if (!group) throw new Error('Not found')
      if (group.members.some(item => item.user._id.equals(req.currentUser._id))) {
        const foundGroup = group.members.find(item => item.user._id.equals(req.currentUser._id))
        group.members.splice(group.members.indexOf(foundGroup), 1)
        return group.save()
      }
      group.members.push({ user: req.currentUser })
      return group.save()
    })
    .then(group => res.status(202).json(group))
    .catch(next)
}

function likeGroup(req, res, next) {
  Group
    .findById(req.params.id)
    .then(group => {
      if (!group) throw new Error('Not found')
      if (group.likes.some(item => item.user._id.equals(req.currentUser._id))) {
        const foundLike = group.likes.find(item => item.user._id.equals(req.currentUser._id))
        group.likes.splice(group.likes.indexOf(foundLike), 1)
        return group.save()
      }
      group.likes.push({ user: req.currentUser })
      return group.save()
    })
    .then(group => res.status(202).json(group))
    .catch(next)
}

function makeGroupComment(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('comments.user')
    .then(group => {
      if (!group) throw new Error('Not found')
      group.comments.push({ user: req.currentUser, text: req.body.text })
      return group.save()
    })
    .then(group => res.status(202).json(group))
    .catch(next)
}

function editGroupComment(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('comments.user')
    .then(group => {
      if (!group) throw new Error('Not found')
      group.comments.map(comment => {
        if (comment._id.equals(req.params.commentId) && comment.user._id.equals(req.currentUser._id)) {
          comment.text = req.body.text
          return comment.save()
        }
      })
      return group.save()
    })
    .then(group => res.status(201).json(group))
    .catch(next)
}

function deleteGroupComment(req, res, next) {
  Group
    .findById(req.params.id)
    .populate('comments.user')
    .then(group => {
      if (!group) throw new Error('Not found')
      group.comments.map(comment => {
        if (comment._id.equals(req.params.commentId) && comment.user._id.equals(req.currentUser._id)) {
          group.comments.splice(group.comments.indexOf(comment), 1)
          return
        }
      })
      return group.save()
    })
    .then(group => res.status(204).json(group))
    .catch(next)
}

module.exports = { 
  getGroup, 
  getAllGroups, 
  createGroup, 
  likeGroup, 
  joinGroup, 
  updateGroup, 
  deleteGroup, 
  makeGroupComment, 
  editGroupComment, 
  deleteGroupComment 
}