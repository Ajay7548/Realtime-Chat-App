import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

/**
 * Helper function to guess gender based on name
 * This is a simple heuristic and won't be 100% accurate
 */
const guessGenderFromName = (fullName) => {
  const name = fullName.toLowerCase();

  // Common male name patterns (expanded list with Indian names)
  const maleNames = [
    "john",
    "jack",
    "james",
    "robert",
    "michael",
    "william",
    "david",
    "joseph",
    "rohit",
    "rahul",
    "amit",
    "raj",
    "ajay",
    "suraj",
    "jayesh",
    "vishal",
    "arjun",
    "rohan",
    "karan",
    "aditya",
    "pranav",
    "aniket",
    "varun",
    "siddharth",
    "nikhil",
    "akash",
    "gaurav",
    "harsh",
    "manish",
    "vikram",
    "abhishek",
    "deepak",
    "ravi",
    "gowtham",
    "krishna",
    "ram",
    "shyam",
    "mohan",
    "arun",
    "anand",
    "sanjay",
    "vijay",
    "manoj",
    "naveen",
    "sachin",
    "ashok",
    "ramesh",
    "dinesh",
    "rajesh",
    "ron",
    "bob",
    "tom",
    "steve",
    "mark",
    "paul",
    "daniel",
    "chris",
    "ryan",
  ];

  // Common female name patterns (expanded list with Indian names)
  const femaleNames = [
    "nancy",
    "jane",
    "mary",
    "patricia",
    "jennifer",
    "linda",
    "elizabeth",
    "barbara",
    "susan",
    "priya",
    "anjali",
    "neha",
    "pooja",
    "shreya",
    "amelia",
    "aarti",
    "ananya",
    "kavya",
    "riya",
    "diya",
    "isha",
    "tanya",
    "sneha",
    "divya",
    "meera",
    "sana",
    "rani",
    "rekha",
    "sunita",
    "geeta",
    "preeti",
    "nisha",
    "sapna",
    "shweta",
    "swati",
    "simran",
    "pallavi",
    "komal",
    "megha",
    "sarah",
    "emily",
    "jessica",
    "ashley",
    "amanda",
    "melissa",
    "nicole",
    "rachel",
  ];

  // Split name into words to check each part
  const nameWords = name.split(" ");

  // Check each word in the name
  for (const word of nameWords) {
    // Check if word contains any male indicators
    for (const maleName of maleNames) {
      if (word.includes(maleName) || maleName.includes(word)) {
        return "male";
      }
    }

    // Check if word contains any female indicators
    for (const femaleName of femaleNames) {
      if (word.includes(femaleName) || femaleName.includes(word)) {
        return "female";
      }
    }
  }

  // Default to other if can't determine
  return "other";
};

/**
 * Generate gender-specific avatar URL
 */
const generateGenderAvatar = (fullName, gender) => {
  if (gender === "male") {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      fullName
    )}&hair=short01,short02,short03,short04&facialHair=beardLight,beardMedium`;
  } else if (gender === "female") {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      fullName
    )}&hair=long01,long02,long03,long04&facialHair=blank`;
  } else {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
      fullName
    )}`;
  }
};

/**
 * POST /api/migrate/default-profiles
 * Adds default profile pictures to users who don't have one
 */
router.post("/default-profiles", async (req, res) => {
  try {
    console.log(
      "🔄 Starting migration: Adding gender-specific default profile pictures..."
    );

    // Find all users without a profile picture (empty string or null)
    const usersWithoutPic = await User.find({
      $or: [
        { profilePic: "" },
        { profilePic: null },
        { profilePic: { $exists: false } },
      ],
    });

    console.log(
      `📊 Found ${usersWithoutPic.length} users without profile pictures`
    );

    if (usersWithoutPic.length === 0) {
      return res.status(200).json({
        success: true,
        message: "All users already have profile pictures!",
        updated: 0,
      });
    }

    // Update each user with a gender-specific default profile picture
    const updates = [];
    const userDetails = [];

    for (const user of usersWithoutPic) {
      // Guess gender if not set
      const gender = user.gender || guessGenderFromName(user.fullName);
      const defaultProfilePic = generateGenderAvatar(user.fullName, gender);

      updates.push(
        User.findByIdAndUpdate(user._id, {
          profilePic: defaultProfilePic,
          gender: gender, // Also set gender if not already set
        })
      );

      userDetails.push({
        name: user.fullName,
        email: user.email,
        assignedGender: gender,
      });
    }

    await Promise.all(updates);

    console.log(
      `✅ Migration complete! Updated ${usersWithoutPic.length} users.`
    );

    res.status(200).json({
      success: true,
      message: `Successfully updated ${usersWithoutPic.length} users with gender-specific default profile pictures`,
      updated: usersWithoutPic.length,
      users: userDetails,
    });
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Migration failed",
      error: error.message,
    });
  }
});

/**
 * POST /api/migrate/update-all-profiles
 * Force updates ALL users with gender-specific profile pictures
 */
router.post("/update-all-profiles", async (req, res) => {
  try {
    console.log(
      "🔄 Starting migration: Updating ALL users with gender-specific avatars..."
    );

    // Find all users (we'll update everyone)
    const allUsers = await User.find({});

    console.log(`📊 Found ${allUsers.length} total users`);

    if (allUsers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users found in database!",
        updated: 0,
      });
    }

    // Update each user with a gender-specific default profile picture
    const updates = [];
    const userDetails = [];

    for (const user of allUsers) {
      // Guess gender if not set
      const gender = user.gender || guessGenderFromName(user.fullName);
      const newProfilePic = generateGenderAvatar(user.fullName, gender);

      updates.push(
        User.findByIdAndUpdate(user._id, {
          profilePic: newProfilePic,
          gender: gender, // Also set gender if not already set
        })
      );

      userDetails.push({
        name: user.fullName,
        email: user.email,
        assignedGender: gender,
      });
    }

    await Promise.all(updates);

    console.log(
      `✅ Migration complete! Updated ${allUsers.length} users with gender-specific avatars.`
    );

    res.status(200).json({
      success: true,
      message: `Successfully updated ${allUsers.length} users with gender-specific default profile pictures`,
      updated: allUsers.length,
      users: userDetails,
    });
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Migration failed",
      error: error.message,
    });
  }
});

/**
 * DELETE /api/migrate/delete-all-users
 * Deletes ALL users from the database (use with caution!)
 */
router.delete("/delete-all-users", async (req, res) => {
  try {
    console.log("⚠️  Starting deletion: Removing ALL users from database...");

    // Delete all users
    const result = await User.deleteMany({});

    console.log(`✅ Deleted ${result.deletedCount} users from database.`);

    res.status(200).json({
      success: true,
      message: `Successfully deleted ${result.deletedCount} users. Database is now empty.`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("❌ Deletion failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Deletion failed",
      error: error.message,
    });
  }
});

export default router;
