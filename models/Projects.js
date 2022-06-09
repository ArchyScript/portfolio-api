const mongoose = require('mongoose')
const Schema = mongoose.Schema

const links = new Schema(
  {
    github: {
      type: String,
      default: '',
    },

    netlify: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
)

const image_details = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  },
)

//
const Projects = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  techs: [String],
  image_details: image_details,
  links: links,
  is_client_project: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
})

module.exports = mongoose.model('Projects', Projects)
