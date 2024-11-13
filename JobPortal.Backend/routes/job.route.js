import express from 'express';
import { postJob, getAllJobs, getJobById, getAdminJobs } from '../controller/job.controller.js';
import isAuthenticated from '../middlewares/isAthenticated.js';

const jobRouter = express.Router();

jobRouter.route('/post').post(isAuthenticated, postJob);
jobRouter.route('/get').get(isAuthenticated, getAllJobs);
jobRouter.route('/get/:id').get(isAuthenticated, getJobById);
jobRouter.route('/getadminjobs').get(isAuthenticated, getAdminJobs);

export default jobRouter;
