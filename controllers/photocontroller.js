
import { userModel } from "../models/usermodel.js";
import { supermarketModel } from "../models/supermarketmodel.js";
import { uploadLocalProfilePicture, uploadCloudinaryProfilePicture, uploadLocalSupermarketPictures, uploadCloudinarySupermarketPictures } from "../helpers/multerconfig.js";
import cloudinary from "../helpers/cloudinaryconfig.js";

export const photoControllers = {
    updateProfilePictureLocal: async (req, res) => {
        try {
            uploadLocalProfilePicture(req, res, async (err) => {
                if (err) {
                    console.error("Error uploading photo:", err);
                    return res.status(400).json({ message: "Error uploading photo" });
                }

                if (!req.file) {
                    return res.status(403).json({ message: "No file selected" });
                }

                const userImgUrl = "/uploads/" + req.file.filename;

                const updatedUser = await userModel.findByIdAndUpdate(
                    req.params.id,
                    { profilePicture: userImgUrl },
                    { new: true }
                );

                return res.status(201).json({
                    message: "Profile photo updated",
                    user: updatedUser,
                });
            });
        } catch (error) {
            console.error("Update user profile photo error:", error.message);
            return res.status(500).json({
                code: "SERVER_ERROR",
                message: "Something went wrong, please try again",
            });
        }
    },

    updateProfilePictureCloudinary: async (req, res) => {
        try {
            uploadCloudinaryProfilePicture(req, res, async (err) => {
                if (err) {
                    console.error("Error uploading photo:", err);
                    return res.status(400).json({ message: "Error uploading photo" });
                }

                if (!req.file) {
                    return res.status(403).json({ message: "No file selected" });
                }

                const result = await cloudinary.uploader.upload(req.file.path);
                const userImgUrl = result.secure_url;

                const updatedUser = await userModel.findByIdAndUpdate(
                    req.params.id,
                    { profilePicture: userImgUrl },
                    { new: true }
                );

                return res.status(201).json({
                    message: "Profile photo updated",
                    user: updatedUser,
                });
            });
        } catch (error) {
            console.error("Update user profile photo error:", error.message);
            return res.status(500).json({
                code: "SERVER_ERROR",
                message: "Something went wrong, please try again",
            });
        }
    },
    
    
    updateSupermarketPicturesLocal: async (req, res) => {
        try {
            // Use multer middleware to handle file uploads
            uploadLocalSupermarketPictures(req, res, async (err) => {
                if (err) {
                    return res.status(400).json({ message: err });
                }

                // Fetch user and supermarket based on IDs
                const user = await userModel.findById(req.params.userId);
                const supermarket = await supermarketModel.findById(req.params.supermarketId);
            
                // Check if user and supermarket exist
                if (!user || !supermarket) {
                    return res.status(404).json({ message: "User or supermarket not found" });
                }
            
                // Check if the user created the supermarket
                if (supermarket.createdBy.toString() !== req.params.userId) {
                    return res.status(403).json({ message: "Unauthorized" });
                }
            
                // Check if the user is trying to upload more than 5 pictures
                if (supermarket.supermarketPictures.length + req.files.length > 5) {
                    return res.status(400).json({ message: "Cannot upload more than 5 photos" });
                }
            
                // Process and save the uploaded pictures
                const uploadedPictures = req.files.map(file => "/uploads/" + file.filename);
                supermarket.supermarketPictures.push(...uploadedPictures);
                await supermarket.save();
            
                return res.status(201).json({
                    message: "Supermarket photos updated",
                    supermarket,
                });
            });
        } catch (error) {
            console.error("Update supermarket photos error:", error.message);
            return res.status(500).json({
                code: "SERVER_ERROR",
                message: "Something went wrong, please try again",
            });
        }
    },

    updateSupermarketPicturesCloudinary: async (req, res) => {
        try {
            uploadCloudinarySupermarketPictures(req, res, async (err) => {
                if (err) {
                    console.error("Error uploading photos:", err);
                    return res.status(400).json({ message: "Error uploading photos" });
                }
    
                if (!req.files || req.files.length === 0) {
                    return res.status(403).json({ message: "No files selected" });
                }
    
                // Upload files to Cloudinary and retrieve URLs
                const uploadedPictures = await Promise.all(req.files.map(async (file) => {
                    try {
                        const result = await cloudinary.uploader.upload(file.path);
                        return result.secure_url;
                    } catch (uploadErr) {
                        console.error("Error uploading photo to Cloudinary:", uploadErr);
                        throw new Error("Failed to upload photo to Cloudinary");
                    }
                }));
    
                // Fetch user and supermarket based on IDs
                const user = await userModel.findById(req.params.userId);
                const supermarket = await supermarketModel.findById(req.params.supermarketId);
                
                // Check if user and supermarket exist
                if (!user || !supermarket) {
                    return res.status(404).json({ message: "User or supermarket not found" });
                }
            
                // Check if the user created the supermarket
                if (supermarket.createdBy.toString() !== req.params.userId) {
                    return res.status(403).json({ message: "Unauthorized" });
                }
    
                // Check if the user is trying to upload more than 5 pictures
                if (supermarket.supermarketPictures.length + uploadedPictures.length > 5) {
                    return res.status(400).json({ message: "Cannot upload more than 5 photos" });
                }
    
                // Update supermarket photos with Cloudinary URLs
                supermarket.supermarketPictures.push(...uploadedPictures);
                await supermarket.save();
    
                return res.status(201).json({
                    message: "Supermarket photos updated",
                    supermarket,
                });
            });
        } catch (error) {
            console.error("Update supermarket photos error:", error.message);
            return res.status(500).json({
                code: "SERVER_ERROR",
                message: "Something went wrong, please try again",
            });
        }
    }
        
};
