const mongoose = require('mongoose')
const Schema = mongoose.Schema

const language_and_framework = new Schema({
    name: {
        type: String,
        default: '',
    },

    language_or_framework: {
        type: String,
        default: '',
    },

    descripiton: {
        type: String,
        default: '',
    },

    // image_details: image_details,

    ratings: {
        type: Number,
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
const LanguagesAndFrameworks = new Schema({
    name: {
        type: String,
        default: '',
    },

    language_or_framework: {
        type: String,
        default: '',
    },

    ratings: {
        type: Number,
        default: 1,
    },
    image_details: image_details,
})

module.exports = mongoose.model(
    'LanguagesAndFrameworks',
    LanguagesAndFrameworks,
)