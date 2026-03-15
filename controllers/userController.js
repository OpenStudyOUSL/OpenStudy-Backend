import User from "../model/user.js";
import Leaderboard from "../model/leaderbord.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function createUser(req, res) {
  const newUserData = req.body;

  if (newUserData.type == "admin") {
    if (req.user == null) {
      res.json({
        message: "Please login as administrator to create admin account",
      });
      return;
    }

    if (req.user.type != "admin") {
      res.json({
        message: "Please login as administrator to create admin account",
      });
      return;
    }
  }

  newUserData.password = bcrypt.hashSync(newUserData.password, 10);

  const user = new User(newUserData);

  user
    .save()
    .then(() => {
      res.json({
        message: "User created",
      });
    })
    .catch((err) => {
      let message = "User not created";
      if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        message = `This ${field} is already registered.`;
      }
      res.status(403).json({
        message: message,
        error: err
      });
    });
}

export function loginUser(req, res) {
  User.find({ email: req.body.email }).then((users) => {
    if (users.length == 0) {
      res.json({
        message: "User not found",
      });
    } else {
      const user = users[0];

      const isPasswordCrorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (isPasswordCrorrect) {
        const token = jwt.sign(
          {
            email: user.email,
            userName: user.userName,
            registerNumber: user.registerNumber,
            isBlocked: user.isBlocked,
            type: user.type,
            profilePicture: user.profilePicture,
          },
          process.env.SECRET_KEY
        );

        res.json({
          message: "User logged in",
          token: token,
          user: {
            userName: user.userName,
            registerNumber: user.registerNumber,
            type: user.type,
            profilePicture: user.profilePicture,
            email: user.email,
            isBlocked: user.isBlocked,
          },
        });
      } else {
        res.json({
          message: "User not logged in (wrong password)",
        });
      }
    }
  });
}
export function isAdmin(req) {
  if (req.user == null) {
    return false;
  }

  if (req.user.type != "admin") {
    return false;
  }

  return true;
}

export function isStudent(req) {
  if (req.user == null) {
    return false;
  }

  if (req.user.type != "student") {
    return false;
  }

  return true;
}

export async function getUser(req, res) {
  if (req.user == null) {
    res.status(404).json({
      message: "Please login to view user details",
    });
    return;
  }

  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // Return user without password
    const { password, ...userWithoutPassword } = user.toObject();
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export function getAllUsers(req, res) {
  User.find({}).then((users) => {
    res.json(users);
  });
}

export function updateUserType(req, res){
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as admin to edit User Type",
    });
    return;
  }

  const userEmail = decodeURIComponent(req.params.email);
  const newUser = req.body;

  User.updateOne({email : userEmail}, { $set: newUser }).then(
    ()=>{
      res.json({
        message : "User Type updated."
      })
    }
  ).catch(
    (e)=>{
      res.status(403).json({
        message : e
      })
    })
}

export function changeUserInfo(req, res) {
  if (req.user == null) {
    res.status(404).json({
      message: "Please login to edit user details",
    });
    return;
  }

  const userEmail = req.user.email;
  const newUser = req.body;

  User.updateOne({ email: userEmail }, newUser)
    .then(async () => {
      // Sync with leaderboard if userName or profilePicture changed
      if (newUser.userName || newUser.profilePicture) {
        try {
          // We find by email if we had email in leaderboard, 
          // but currently leaderboard uses userName. 
          // This is a risk if userName changes. 
          // For now, we update by the OLD userName if we have it, 
          // or we'd need to have email in Leaderboard model.
          
          await Leaderboard.updateMany(
            { userName: req.user.userName }, // Use the name from the token (pre-update)
            { 
              $set: { 
                userName: newUser.userName || req.user.userName,
                profilePicture: newUser.profilePicture !== undefined ? newUser.profilePicture : req.user.profilePicture
              }
            }
          );
        } catch (syncErr) {
          console.error("Leaderboard sync error:", syncErr);
        }
      }

      res.json({
        message: "User details updated.",
      });
    })
    .catch((e) => {
      res.status(403).json({
        message: e,
      });
    });
}

export async function getUserCount(req, res) {
  try {
    const count = await User.countDocuments({});
    res.json({ count });
  } catch (e) {
    res.status(500).json({ message: "Error fetching user count" });
  }
}



export async function deleteUser(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({
      message: "Please login as admin to delete users",
    });
    return;
  }

  try {
    const userEmail = decodeURIComponent(req.params.email);
    
    // Find user first to get their username for leaderboard cleanup
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Delete from users collection
    await User.deleteOne({ email: userEmail });

    // Cleanup leaderboard entry
    try {
      await Leaderboard.deleteOne({ userName: user.userName });
    } catch (syncErr) {
      console.error("Leaderboard cleanup error:", syncErr);
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
}

// admin account email: saman@gmail.com   password: samanopen
// student account email: piyal@gmail.com   password: piyalopen