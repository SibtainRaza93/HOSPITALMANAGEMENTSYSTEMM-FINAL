import express from "express";
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import {isAdminAuthenticate, isPatientAuthenticate} from "../middlewares/auth.js"

const router = express.Router();

router.post("/post",isPatientAuthenticate, postAppointment)
router.get("/getall",isAdminAuthenticate, getAllAppointments)
router.put("/update/:id",isAdminAuthenticate, updateAppointmentStatus)
router.delete("/delete/:id",isAdminAuthenticate, deleteAppointment)

export default router;