import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import {User} from './../models/user.model.js';
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudnary.js';

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        const file=req.file;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(201).json({
                message: "Email already exists",
                success: false
            });
        }
        let profilePhotoUrl = '';  // Default to an empty string


        if (file) {
            const fileUri = getDataUri(file); // Get the data URI for the file (needs to be implemented in utils)
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

            // Update user profile with the Cloudinary URL
            if (cloudResponse && cloudResponse.secure_url) {
                profilePhotoUrl= cloudResponse.secure_url;
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl        }
        });
        return res.status(201).json({
            message: "User registered successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(201).json({
                message: "Email does not exist",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(201).json({
                message: "Password is incorrect",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(201).json({
                message: "Account does not exist with selected role",
                success: false
            });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        }).json({
            message: `Welcome Back ${user.fullname}`,
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
                fullname: user.fullname,
                phoneNumber: user.phoneNumber,
                profile: user.profile
            },
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
const file=req.file;

        let skillsArray;
        if (skills) {
            skillsArray = skills.trim().split(" ").map(skill => skill.trim());
        }

        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Update user profile fields conditionally
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;

        if (file) {
            const fileUri = getDataUri(file); // Get the data URI for the file
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content); // Upload to Cloudinary

            // Update user profile with Cloudinary response
            if (cloudResponse) {
                user.profile.resume = cloudResponse.secure_url;
                user.profile.resumeOriginalName = file.originalname;
            }
        }

       
        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

