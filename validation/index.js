const Joi = require('joi')

const descriptions = Joi.object().keys({
    title: Joi.string().optional().min(20).max(1024).messages({
        'string.base': `"description title" should be a "String"`,
        'string.empty': `"description title" cannot be an empty field`,
    }),
})

const technologies = Joi.object().keys({
    // language_or_framewwork: Joi.string()
    //     .optional()
    //     .min(20)
    //     .max(1024)
    //     .require()
    //     .messages({
    //         'string.base': `"language_or_framewwork" should be a "String"`,
    //         'string.empty': `"language_or_framewwork" cannot be an empty field`,
    //     }),
    name: Joi.string().optional().min(20).max(1024).required().messages({
        'string.base': `"technology name" should be a "String"`,
        'string.empty': `"technology name" cannot be an empty field`,
    }),
})

const links = Joi.object({
    netlify: Joi.string().optional().messages({
        'string.base': `"netlify" should be a "String"`,
        'string.empty': `"netlify" cannot be an empty field`,
    }),
    github: Joi.string().optional().messages({
        'string.base': `"github" should be a "String"`,
        'string.empty': `"github" cannot be an empty field`,
    }),
})

const image_details = Joi.object({
    title: Joi.string().optional().messages({
        'string.base': `"title" should be a "String"`,
        'string.empty': `"title" cannot be an empty field`,
    }),
    cloudinary_id: Joi.string().optional().messages({
        'string.base': `"cloudinary_id" should be a "String"`,
        'string.empty': `"cloudinary_id" cannot be an empty field`,
    }),
    avatar: Joi.string().optional().messages({
        'string.base': `"avatar" should be a "String"`,
        'string.empty': `"avatar" cannot be an empty field`,
    }),
})

//User-defined function to validate the user
const ProjectUploadValidation = (userData) => {
    const UserSchema = {
        title: Joi.string().optional().messages({
            'string.base': `"title" should be a "String"`,
            'string.empty': `"title" cannot be an empty field`,
        }),
        technologies: technologies,
        descriptions: descriptions,
        links: links,
        image_details: image_details,
        is_active: Joi.boolean(),
    }

    const JoiSchema = Joi.object(UserSchema)

    return JoiSchema.validate(userData)
}

//User-defined function to validate the user
const LanguagesAndFrameworksValidation = (userData) => {
    const UserSchema = {
        name: Joi.string().optional().messages({
            'string.base': `"name" should be a "String"`,
            'string.empty': `"name" cannot be an empty field`,
        }),
        language_or_framework: Joi.string().optional().messages({
            'string.base': `"language_or_framework" should be a "String"`,
            'string.empty': `"language_or_framework" cannot be an empty field`,
        }),
        ratings: Joi.string().optional().messages({
            'string.base': `"ratings" should be a "String"`,
            'string.empty': `"ratings" cannot be an empty field`,
        }),
        image_details: image_details,
    }

    const JoiSchema = Joi.object(UserSchema)

    return JoiSchema.validate(userData)
}
module.exports = { ProjectUploadValidation, LanguagesAndFrameworksValidation }