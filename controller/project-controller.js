const cloudinary = require('../config/cloudinary')
const UserProfile = require('../models/Projects')

// get all profile
const getAllUsers = async(req, res) => {
    try {
        const allProfiles = await UserProfile.find()
        res.json(allProfiles)
    } catch (error) {
        console.log(error)
    }
}

const createUserProfile = async(req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)

        let userProfile = new UserProfile({
            username: req.body.username,
            email: req.body.email,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        })

        const savedProfile = await userProfile.save()
        res.json(savedProfile)
    } catch (error) {
        console.log(error)
    }
}

const getSingleUser = async(req, res) => {
    try {
        let singleProfile = await UserProfile.findOne({ _id: req.params.id })

        if (!singleProfile) return res.send('No profile found in database')

        res.json(singleProfile)
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async(req, res) => {
    try {
        let singleProfile = await UserProfile.findOne({ _id: req.params.id })

        if (!singleProfile) return res.send('No profile found in database')
            // Remove picture from cloudinary
            // await cloudinary.uploader.destroy(singleProfile.cloudinary_id)
            // Upload new picture to cloudinary
            // Some valiations needed though
            // console.log(result)
        const result = await cloudinary.uploader.upload(req.file.path)
        let data = {
            username: req.body.username || singleProfile.username,
            email: req.body.email || singleProfile.email,
            avatar: result.secure_url || singleProfile.avatar,
            cloudinary_id: result.public_id || singleProfile.cloudinary_id,
        }

        const updatedProfile = await UserProfile.findByIdAndUpdate(
            req.params.id,
            data, { new: true },
        )

        res.json(updatedProfile)
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async(req, res) => {
    try {
        res.send(req.params.id)
        let profileToDelete = await UserProfile.findOne({ _id: req.params.id })

        if (!profileToDelete) return res.send('No profile found in database')
        await cloudinary.uploader.destroy(profileToDelete.cloudinary_id)

        // await profileToDelete.remove()
        // res.json(profileToDelete)
    } catch (error) {
        console.log(error)
    }
}

// // delete profile picture
// router.delete('/:id', async(req, res) => {
// try {
//     let profileToDelete = await UserProfile.findOne({ _id: req.params.id })

//     if (!profileToDelete) return res.send('No profile found in database')
//     await cloudinary.uploader.destroy(profileToDelete.cloudinary_id)

//     await profileToDelete.remove()
//     res.json(profileToDelete)
// } catch (error) {
//     console.log(error)
// }
// })

module.exports = {
    getAllUsers,
    getSingleUser,
    createUserProfile,
    updateUser,
    deleteUser,
}