import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    companyID:{
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    logo: { 
      type: String, 
      default: "" 
    },
    certificate: {
       type: String,
        default: ""
       },
  },
  {
    collection: "user-data",
  }
);

const model = mongoose.model("userData", User);
export default model;
// © 2025 Chinmayee C J. All rights reserved.
