import { config } from "dotenv";
import { connectToDatabase } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Female Users
  {
    email: "rupalibhosle@gmail.com",
    fullName: "Rupali Bhosle",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",

  },
 
  {
    email: "kritikasingh@gmail.com",
    fullName: "Kritika Singh",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "tejalmoore@gmail.com",
    fullName: "Tejal Moore",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "amelia.garcia@gmail.com",
    fullName: "Amelia Garcia",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },

  // Male Users
  {
    email: "Pranav@gmail.com",
    fullName: "Pranav S",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "shubhammishra@gmail.com",
    fullName: "Shubham Mishra",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  
  {
    email: "surajgupta@gmail.com",
    fullName: "Suraj Gupta",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",

  },
  
  {
    email: "rohanshinde@gmail.com",
    fullName: "Rohan shinde",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
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