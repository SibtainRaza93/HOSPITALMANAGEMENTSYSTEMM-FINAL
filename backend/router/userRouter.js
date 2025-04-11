import express from "express";
import {addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister} from "../controller/userController.js";
import {isAdminAuthenticate, isPatientAuthenticate} from "../middlewares/auth.js"

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticate, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticate, getUserDetails);
router.get("/patient/me", isPatientAuthenticate, getUserDetails);
router.get("/admin/logout", logoutAdmin);
router.get("/patient/logout", logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticate, addNewDoctor);


export default router;