import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";

/**
 * Migration script to add default profile pictures to existing users
 * who don't have a profile picture set
 */

const migrateExistingUsers = async () => {
  try {
    console.log(
      "🔄 Starting migration: Adding default profile pictures to existing users..."
    );

    // Connect to database
    await connectDB();

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
      console.log("✅ All users already have profile pictures!");
      process.exit(0);
    }

    // Update each user with a default profile picture
    let updatedCount = 0;
    for (const user of usersWithoutPic) {
      const defaultProfilePic = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        user.fullName
      )}`;

      await User.findByIdAndUpdate(user._id, {
        profilePic: defaultProfilePic,
      });

      updatedCount++;
      console.log(`✓ Updated ${user.fullName} (${user.email})`);
    }

    console.log(
      `\n✅ Migration complete! Updated ${updatedCount} users with default profile pictures.`
    );
    console.log(
      "👉 Please restart your application for changes to take effect."
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    process.exit(1);
  }
};

// Run the migration
migrateExistingUsers();
