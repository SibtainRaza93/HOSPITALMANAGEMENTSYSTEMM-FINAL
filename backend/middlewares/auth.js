import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// Authentication
export const isAdminAuthenticate = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin Not Authenticated!"));
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        
        if (!req.user) {
            return next(new ErrorHandler("User not found", 404));
        }
        
        // This is an Authorization check
        if (req.user.role !== "Admin") {
            return next(
                new ErrorHandler(
                    `${req.user.role} not authorized for this resource!`, 403
                )
            );
        }
        next();
    } catch (error) {
        return next(new ErrorHandler("Authentication failed, please login again", 401));
    }
});

export const isPatientAuthenticate = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("Patient Not Authenticated!"));
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        
        if (!req.user) {
            return next(new ErrorHandler("User not found", 404));
        }
        
        // This is an Authorization check
        if (req.user.role !== "Patient") {
            return next(
                new ErrorHandler(
                    `${req.user.role} not authorized for this resource!`, 403
                )
            );
        }
        next();
    } catch (error) {
        return next(new ErrorHandler("Authentication failed, please login again", 401));
    }
});
