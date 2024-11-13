import { populate } from 'dotenv';
import { Job } from '../models/job.model.js';
import { Application } from './../models/applications.model.js';
import { User } from '../models/user.model.js';

// Apply for a job
export const applyJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!jobId) {
      return res.status(400).json({ success: false, message: "Invalid job id" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const existingApplication = await Application.findOne({ Job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({ success: false, message: "You have already applied for this job" });
    }

    const newApplication = new Application({
      applicant: userId,
      Job: jobId
    });

    await newApplication.save();
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// Get all applied jobs for a user
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'Job',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'company',
          options: { sort: { createdAt: -1 } },
        }
      });

    if (applications.length === 0) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }

    return res.status(200).json({ success: true, message: "Jobs found", applications });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// Get all applicants for a job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: {
        sort: { createdAt: -1 }
      },
      populate: {
        path: 'applicant'
      }
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, job });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};

// Update application status
export const updateStatus = async (req, res) => {
  try {
    const status = req.body.status;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const application = await Application.findOne({ _id: applicationId });

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};
