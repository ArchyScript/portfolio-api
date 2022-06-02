const router = require('express').Router()
const {
    getAllUsers,
    getSingleUser,
    createUserProfile,
    updateUser,
    deleteUser,
} = require('../controller/project-controller')
const { upload } = require('../utilities/multer')

//
router.get('/', getAllUsers)
router.get('/:id', getSingleUser)
router.post('/', upload.single('image'), createUserProfile)
router.patch('/:id', upload.single('image'), updateUser)
router.delete('/:id', deleteUser)

module.exports = router