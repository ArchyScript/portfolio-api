const mongoose = require('mongoose')
const Schema = mongoose.Schema

const descriptions = new Schema({
    title: {
        type: String,
        default: '',
    },
})

const technologies = new Schema({
    // language_or_framewwork: {
    //     type: String,
    //     default: '',
    // },

    name: {
        type: String,
        default: '',
    },
}, {
    _id: false,
}, )

const links = new Schema({
    github: {
        type: String,
        default: '',
    },

    netlify: {
        type: String,
        default: '',
    },
}, {
    _id: false,
}, )

const image_details = new Schema({
    title: {
        type: String,
        default: '',
    },
    cloudinary_id: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: '',
    },
}, {
    _id: false,
}, )

//
const Projects = new Schema({
    title: {
        type: String,
        required: true,
    },
    image_details: image_details,
    descriptions: [descriptions],
    technologies: [technologies],
    links: links,
    is_active: {
        type: Boolean,
        default: false,
    },
})

module.exports = mongoose.model('Projects', Projects)