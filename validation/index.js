const Joi = require('joi')

//User-defined function to validate the user
const ProjectUploadValidation = (projectData) => {
  const ProjectSchema = {
    title: Joi.string().required().messages({
      'string.base': `"title" should be a "String"`,
      'string.empty': `"title" cannot be an empty field`,
    }),
    description: Joi.string().required().messages({
      'string.base': `"title" should be a "String"`,
      'string.empty': `"title" cannot be an empty field`,
    }),
    techs: Joi.string().required().min(2).messages({
      'string.base': `"title" should be a "String"`,
      'string.empty': `"title" cannot be an empty field`,
    }),
    link_netlify: Joi.string().required().messages({
      'string.base': `"netlify" should be a "String"`,
      'string.empty': `"netlify" cannot be an empty field`,
    }),
    link_github: Joi.string().optional().messages({
      'string.base': `"github" should be a "String"`,
      'string.empty': `"github" cannot be an empty field`,
    }),
    is_client_project: Joi.boolean(),
    is_active: Joi.boolean(),
  }

  const JoiSchema = Joi.object(ProjectSchema)

  return JoiSchema.validate(projectData)
}

module.exports = { ProjectUploadValidation }

// const Joi = require('joi')

// // const description = Joi.object().keys({
// //   title: Joi.string().required().min(20).max(1024).messages({
// //     'string.base': `"description title" should be a "String"`,
// //     'string.empty': `"description title" cannot be an empty field`,
// //   }),
// // })

// // const technologies = Joi.object().keys({
// //   // language_or_framewwork: Joi.string()
// //   //     .required()
// //   //     .min(20)
// //   //     .max(1024)
// //   //     .require()
// //   //     .messages({
// //   //         'string.base': `"language_or_framewwork" should be a "String"`,
// //   //         'string.empty': `"language_or_framewwork" cannot be an empty field`,
// //   //     }),
// //   name: Joi.string().required().min(20).max(1024).required().messages({
// //     'string.base': `"technology name" should be a "String"`,
// //     'string.empty': `"technology name" cannot be an empty field`,
// //   }),
// // })

// const links = Joi.object({
//   netlify: Joi.string().required().messages({
//     'string.base': `"netlify" should be a "String"`,
//     'string.empty': `"netlify" cannot be an empty field`,
//   }),
//   github: Joi.string().required().messages({
//     'string.base': `"github" should be a "String"`,
//     'string.empty': `"github" cannot be an empty field`,
//   }),
// })

// const image_details = Joi.object({
//   title: Joi.string().required().messages({
//     'string.base': `"title" should be a "String"`,
//     'string.empty': `"title" cannot be an empty field`,
//   }),
//   cloudinary_id: Joi.string().required().messages({
//     'string.base': `"cloudinary_id" should be a "String"`,
//     'string.empty': `"cloudinary_id" cannot be an empty field`,
//   }),
//   avatar: Joi.string().required().messages({
//     'string.base': `"avatar" should be a "String"`,
//     'string.empty': `"avatar" cannot be an empty field`,
//   }),
// })

// //User-defined function to validate the user
// const ProjectUploadValidation = (projectData) => {
//   const ProjectSchema = {
//     title: Joi.string().required().messages({
//       'string.base': `"title" should be a "String"`,
//       'string.empty': `"title" cannot be an empty field`,
//     }),
//     description: Joi.string().required().messages({
//       'string.base': `"title" should be a "String"`,
//       'string.empty': `"title" cannot be an empty field`,
//     }),
//     technologies: Joi.string().required().messages({
//       'string.base': `"title" should be a "String"`,
//       'string.empty': `"title" cannot be an empty field`,
//     }),
//     links: links,
//     image_details: image_details,
//     is_active: Joi.boolean(),
//   }

//   const JoiSchema = Joi.object(ProjectSchema)

//   return JoiSchema.validate(projectData)
// }

// //User-defined function to validate the user
// const LanguagesAndFrameworksValidation = (userData) => {
//   const LanguagesAndFrameworkSchema = {
//     name: Joi.string().required().messages({
//       'string.base': `"name" should be a "String"`,
//       'string.empty': `"name" cannot be an empty field`,
//     }),
//     language_or_framework: Joi.string().required().messages({
//       'string.base': `"language_or_framework" should be a "String"`,
//       'string.empty': `"language_or_framework" cannot be an empty field`,
//     }),
//     ratings: Joi.string().required().messages({
//       'string.base': `"ratings" should be a "String"`,
//       'string.empty': `"ratings" cannot be an empty field`,
//     }),
//     image_details: image_details,
//   }

//   const JoiSchema = Joi.object(LanguagesAndFrameworkSchema)

//   return JoiSchema.validate(userData)
// }
// module.exports = { ProjectUploadValidation, LanguagesAndFrameworksValidation }
