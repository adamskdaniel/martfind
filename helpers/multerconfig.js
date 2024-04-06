import multer from "multer";
import fs from "fs";

// Multer image filter function
const imageFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/i)) {
        return cb("Only image files are allowed", false);
    }
    cb(null, true);
};

// Multer disk storage configurations
const storageLocal = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadFolderPath = "./uploads";
        fs.access(uploadFolderPath, fs.constants.F_OK, (err) => {
            if (err) {
                fs.mkdir(uploadFolderPath, (err) => {
                    if (err) {
                        console.error('Error creating "uploads" folder:', err);
                    } else {
                        console.log('"uploads" folder created successfully');
                        cb(null, uploadFolderPath);
                    }
                });
            } else {
                cb(null, uploadFolderPath);
            }
        });
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const storageCloudinary = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

// Multer setup configurations
export const uploadLocalProfilePicture = multer({
    storage: storageLocal,
    fileFilter: imageFilter,
}).single("profilePicture");

export const uploadCloudinaryProfilePicture = multer({
    storage: storageCloudinary,
    fileFilter: imageFilter,
}).single("profilePicture");

export const uploadLocalSupermarketPictures = multer({
    storage: storageLocal,
    fileFilter: imageFilter,
}).array("supermarketPictures", 5); // Change single to array and limit to 5 images

export const uploadCloudinarySupermarketPictures = multer({
    storage: storageCloudinary,
    fileFilter: imageFilter,
}).array("supermarketPictures", 5); // Change single to array and limit to 5 images
