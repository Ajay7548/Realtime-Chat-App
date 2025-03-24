import { config } from "dotenv";
import { connectToDatabase } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "kritikasingh@gmail.com",
    fullName: "Kritika Singh",
    password: "123456",
  },
  {
    email: "tejalmoore@gmail.com",
    fullName: "Tejal Moore",
    password: "123456",
  },
  {
    email: "amelia.garcia@gmail.com",
    fullName: "Amelia Garcia",
    password: "123456",
  },

  // Male Users
  {
    email: "Pranav@gmail.com",
    fullName: "Pranav S",
    password: "123456",
  },
  {
    email: "shubhammishra@gmail.com",
    fullName: "Shubham Mishra",
    password: "123456",
  },
  
  {
    email: "surajgupta@gmail.com",
    fullName: "Suraj Gupta",
    password: "123456",

  },
  
  {
    email: "rohanshinde@gmail.com",
    fullName: "Rohan shinde",
    password: "123456",
  },
];

const seedDatabase = async () => {
  try {
    await connectToDatabase();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();