const router = require('express').Router()
const {
  getAllProjects,
  getSingleProject,
  createProject,
  //   updateProjectWithoutImage,
  deleteProject,
} = require('../controller/project-controller')
const { upload } = require('../utilities/multer')

//
router.get('/', getAllProjects)
router.get('/:project_id', getSingleProject)
router.post('/', upload.single('project_image'), createProject)
// router.patch('/:project_id', updateProjectWithoutImage)
// router.patch('/:project_id', upload.single('project_image'), updateProject)
router.delete('/:project_id', deleteProject)

module.exports = router
