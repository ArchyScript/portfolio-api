const cloudinary = require('../config/cloudinary')
const Projects = require('../models/Projects')
const { ProjectUploadValidation } = require('../validation')

// get all project
const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Projects.find()
    res.json(allProjects)
  } catch (error) {
    console.log(error)
  }
}

const createProject = async (req, res) => {
  try {
    //   validate project upload request
    const { value, error } = ProjectUploadValidation(req.body)
    // check for any error
    if (error) return res.status(400).send(error.details[0].message)

    // upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path)

    // save relevant image details
    const image_details = {
      title: `archyscript_${value.title}`,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    }

    // get all tech values as string
    const techInStringFormat = value.techs
    // convert string to array
    const techsArray = techInStringFormat.split(',')

    // set the links object
    const links = {
      netlify: value.link_netlify,
      github: value.link_github,
    }

    // create a new project
    const newProject = new Projects({
      title: value.title,
      description: value.description,
      image_details: image_details,
      techs: techsArray,
      links: links,
      is_client_project: value.is_client_project,
      is_active: value.is_active,
    })

    // save project to database
    const savedProject = await newProject.save()
    res.send(savedProject)
  } catch (error) {
    console.log(error)
  }
}

const getSingleProject = async (req, res) => {
  const _id = req.params.project_id

  try {
    let singleProject = await Projects.findOne({ _id })
    if (!singleProject)
      return res.send('No project with this "id" is found in database')

    res.json(singleProject)
  } catch (error) {
    console.log(error)
  }
}

const updateProjectWithoutImage = async (req, res) => {
  const _id = req.params.project_id
  console.log(req.body)

  try {
    let singleProject = await Projects.findOne({ _id })

    if (!singleProject)
      return res.send('No project with this "id" is found in database')
    // Remove picture from cloudinary
    // await cloudinary.uploader.destroy(singleProject.image_details.cloudinary_id)
    // Upload new picture to cloudinary
    // const result = await cloudinary.uploader.upload(req.file.path)

    // // create object for new project image
    // const image_details = {
    //   title: singleProject.image_details.title,
    //   avatar: result.secure_url,
    //   cloudinary_id: result.public_id,
    // }

    console.log(req.body.link_netlify)
    // get all tech values as string
    if (
      req.body.link_netlify !== undefined ||
      req.bod.link_github !== undefined
    ) {
      var links = {
        netlify: req.body.link_netlify || singleProject.link_netlify,
        github: req.body.link_github || singleProject.link_github,
      }
    }

    // get all tech values as string
    if (
      req.body.techs &&
      req.body.techs !== '' &&
      req.body.techs.length > '2'
    ) {
      var techInStringFormat = req.body.techs
      // convert string to array
      var techsArray = techInStringFormat.split(',')
    }

    let data = {
      title: req.body.title || singleProject.title,
      description: req.body.description || singleProject.description,
      links: links || singleProject.links,
      techs: techsArray || singleProject.techs,
      is_client_project:
        req.body.is_client_project || singleProject.is_client_project,
      is_active: req.body.is_active || singleProject.is_active,
      //   image_details: req.body.image_details,
    }

    const updatedProject = await Projects.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true },
    )

    res.json(updatedProject)
  } catch (error) {
    console.log(error)
  }
}

const deleteProject = async (req, res) => {
  const _id = req.params.project_id

  try {
    //   find project in database
    let projectToDelete = await Projects.findOne({ _id })

    // check if project exist
    if (!projectToDelete)
      return res.send('No project with this "id" is found in database')

    // delete image from cloudinary
    await cloudinary.uploader.destroy(
      projectToDelete.image_details.cloudinary_id,
    )

    //  delete project from database
    await projectToDelete.remove()
    res.json('project deleted successful')
  } catch (error) {
    console.log(error)
  }
}

// // delete project picture
// router.delete('/:id', async(req, res) => {
// try {
//     let projectToDelete = await Projects.findOne({ _id: req.params.id })

//     if (!projectToDelete) return res.send('No project with this "id" is found in database')
//     await cloudinary.uploader.destroy(projectToDelete.cloudinary_id)

//     await projectToDelete.remove()
//     res.json(projectToDelete)
// } catch (error) {
//     console.log(error)
// }
// })

module.exports = {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProjectWithoutImage,
  deleteProject,
}

// const updateProjectWithImage = async (req, res) => {
//   const _id = req.params.project_id

//   try {
//     let singleProject = await Projects.findOne({ _id })

//     if (!singleProject)
//       return res.send('No project with this "id" is found in database')
//     // Remove picture from cloudinary
//     // await cloudinary.uploader.destroy(singleProject.image_details.cloudinary_id)
//     // Upload new picture to cloudinary
//     // const result = await cloudinary.uploader.upload(req.file.path)

//     // // create object for new project image
//     // const image_details = {
//     //   title: singleProject.image_details.title,
//     //   avatar: result.secure_url,
//     //   cloudinary_id: result.public_id,
//     // }

//     // get all tech values as string
//     if (req.body.link_netlify || req.bod.link_github) {
//       var links = {
//         netlify: req.body.link_netlify || singleProject.link_netlify,
//         github: req.body.link_github || singleProject.link_github,
//       }
//     }

//     // get all tech values as string
//     if (
//       req.body.techs &&
//       req.body.techs !== '' &&
//       req.body.techs.length > '2'
//     ) {
//       var techInStringFormat = req.body.techs
//       // convert string to array
//       var techsArray = techInStringFormat.split(',')
//     }

//     let data = {
//       title: req.body.title || singleProject.title,
//       description: req.body.description || singleProject.description,
//       links: links || singleProject.links,
//       techs: techsArray || singleProject.techs,
//       is_client_project:
//         req.body.is_client_project || singleProject.is_client_project,
//       is_active: req.body.is_active || singleProject.is_active,
//       //   image_details: req.body.image_details,
//     }

//     const updatedProject = await Projects.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true },
//     )

//     res.json(updatedProject)
//   } catch (error) {
//     console.log(error)
//   }
// }
