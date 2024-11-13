import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "cloudinary";

// Register a new company
export const registerCompany = async (req, res) => {
  try {
    const { companyName, description, website, location } = req.body;
    const file = req.file;

    if (!companyName) {
      return res.status(400).json({ success: false, message: "Please enter company name" });
    }

    const existingCompany = await Company.findOne({ name: companyName });

    if (existingCompany) {
      return res.status(400).json({ success: false, message: "Company already exists" });
    }

    let logoUrl = "";

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      if (cloudResponse && cloudResponse.secure_url) {
        logoUrl = cloudResponse.secure_url;
      } else {
        return res.status(500).json({ success: false, message: "Error uploading logo" });
      }
    }

    const newCompany = await Company.create({
      name: companyName,
      description,
      website,
      location,
      logo: logoUrl,
      userId: req.user.id,
    });

    res.status(201).json({ success: true, message: "Company created successfully", company: newCompany });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error creating company", error: err.message });
  }
};

// Get a company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    if (!companyId) {
      return res.status(400).json({ success: false, message: "Company ID is required" });
    }

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.status(200).json({ success: true, company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error retrieving company", error: err.message });
  }
};

// Get all companies for a user
export const getCompany = async (req, res) => {
  try {
    const userId = req.user.id;

    const companies = await Company.find({ userId });

    if (companies.length === 0) {
      return res.status(404).json({ success: false, message: "No companies found for this user" });
    }

    res.status(200).json({ success: true, companies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error retrieving companies", error: err.message });
  }
};

// Update a company
export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { companyName, description, website, location } = req.body;
    const file = req.file;
const name=companyName;
    if (!id) {
      return res.status(400).json({ success: false, message: "Company ID is required" });
    }

    if (!name) {
      return res.status(400).json({ success: false, message: "Company name is required" });
    }

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      if (cloudResponse && cloudResponse.secure_url) {
        company.logo = cloudResponse.secure_url;
      } else {
        return res.status(500).json({ success: false, message: "Error uploading logo" });
      }
    }

    company.name = name || company.name;
    company.description = description || company.description;
    company.website = website || company.website;
    company.location = location || company.location;

    const updatedCompany = await company.save();

    res.status(200).json({ success: true, message: "Company updated successfully", company: updatedCompany });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error updating company", error: err.message });
  }
};
