import { Job } from '../models/job.model.js';

// Post a new job
export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, position,   companyId } = req.body;
    const userId = req.user.id;

     if (!title ||   !location || !jobType || !companyId ) {
      return res.status(400).json({ success: false, message: "Please fill in all fields" });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position, 
      company: companyId,
      created_by: userId
    });

    return res.status(201).json({ success: true, message: "Job posted successfully", job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };
    const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });

    if (!jobs.length) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }

    return res.status(200).json({ success: true, message: "Jobs retrieved successfully", jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get a single job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("company").populate("applications");

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, message: "Job retrieved successfully", job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all jobs posted by an admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminID = req.user.id;
    const jobs = await Job.find({ created_by: adminID }).populate("company").populate("applications");

    if (!jobs.length) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }

    return res.status(200).json({ success: true, message: "Jobs retrieved successfully", jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
