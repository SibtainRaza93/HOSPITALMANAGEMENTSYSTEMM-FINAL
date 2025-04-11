import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";


export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password, role } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User Already Registered!", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Patient",
  });
  generateToken(user, "User Registered!", 200, res);
});


export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please Provide All Details!", 400));
  }
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Password And Confirm Password Do Not Match!", 400));
  }
  
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email And Password!", 401));
    }
    
    // Try password comparison (for hashed passwords)
    const isPasswordMatch = await user.comparePassword(password);
    
    // Special handling: if password comparison fails, check if passwords match directly (for unhashed passwords)
    // This is a temporary solution for existing users with unhashed passwords
    if (!isPasswordMatch && user.password === password) {
      // If it's a direct match, update the password to be hashed for future logins
      user.password = password; // This will trigger the pre-save middleware to hash it
      await user.save();
      console.log("Updated user password with proper hashing");
    } else if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid Email And Password!", 401));
    }
    
    if (role !== user.role) {
      return next(new ErrorHandler(`User With This Role Not Found! You are a ${user.role}, not a ${role}`, 400));
    }
    
    generateToken(user, "User Logged In Successfully!", 200, res);
  } catch (error) {
    console.error("Login error:", error);
    return next(new ErrorHandler(`Login failed: ${error.message}`, 500));
  }
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, nic } = req.body;
  if(
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !gender ||
      !dob ||
      !nic  
  ){
    return next(new ErrorHandler("Please Fill Full Form!"));
  }
  const isRegistered = await User.findOne({email});
  if(isRegistered){
    return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`));
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "New Admin Registered!"
  });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// Logout function for dashboard admin
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "Admin Logged Out Successfully.",
      });
  } catch (error) {
    return next(new ErrorHandler("Error logging out", 500));
  }
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "Patient Logged Out Successfully.",
      });
  } catch (error) {
    return next(new ErrorHandler("Error logging out", 500));
  }
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !docAvatar
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Doctor With This Email Already Exists!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if(!cloudinaryResponse ||cloudinaryResponse.error){
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary Error"
    );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "New Doctor Registered!",
    doctor
  })
});
