import express from 'express';
import multer from 'multer';
import { getCompanyById, updateCompany, getCompany, registerCompany } from './../Controller/company.controller.js';
import isAuthenticated from './../middlewares/isAthenticated.js';

const companyRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

companyRouter.route('/register').post(isAuthenticated, upload.single('file'), registerCompany);
companyRouter.route('/get').get(isAuthenticated, getCompany);
companyRouter.route('/get/:id').get(isAuthenticated, getCompanyById);
companyRouter.route('/update/:id').put( isAuthenticated, upload.single('file'), updateCompany);

export default companyRouter;
