const userModel = require("../model/user");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

function AllUsers(){
  return userModel.find();
}
function getUserById(id) {
  return userModel.findById(id);  
}

const createUser = async (req, res, next) => {
  var user = req.body;
  try {
    var savedUser = await userModel.create(user);
    await userModel.init();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const addTaskToUser=async(req, res)=> {
var id=req.params.id;
var task=req.body;
  try {
    // Find the user by ID

    const user = await userModel.findById(id);

    if (!user) {
      console.log('User not found');
      return;
    }
console.log(task);
    // Add the new task to the "tasks" array
user.tasks.unshift(task)    // Save the user object
     await user.save();

res.status(200).json(user.tasks[0]);
    console.log('Task added successfully');
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(401).json("error");

  }
}




const deleteTask=async(req, res)=> {
  var id=req.params.id;
  var taskId=req.body.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Find the index of the task in the tasks array
    const taskIndex = user.tasks.findIndex(task => task._id == taskId);
    console.log(taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    // Remove the task from the tasks array
    user.tasks.splice(taskIndex, 1);

    // Save the updated user object
    await user.save();
    res.status(200).json("success");
    console.log('Task deleted successfully');
  } catch (error) {
    console.error(error.message);
    res.status(401).json("error");

  }
}
const updateTask = async (req, res) => {
  try {
    const userId = req.params.id;
    const taskId = req.body.id;
    const updatedTask = req.body.data;

    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Find the index of the task in the tasks array
    const taskIndex = user.tasks.findIndex(task => task._id == taskId);
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }

    // Update the task object with the provided updatedTask
    user.tasks[taskIndex] = {
      ...user.tasks[taskIndex],
      ...updatedTask,
      _id: taskId // Set the task ID to the original ID
    };

    // Save the updated user object
    await user.save();
    res.status(200).json("success");
    console.log('Task updated successfully');
  } catch (error) {
    console.error(error.message);
    res.status(401).json("error");
  }
};







// async function login(req, res) {
//   var { email, password } = req.body;
//   var user = await userModel.findOne({ email });

  
//   if (user) {
//     var valid = bcrypt.compareSync(password, user.password);
//     if (valid) {
//       var token = jwt.sign(
//         {
//           userId: user._id,
//           displayName: user.displayName,
//         },
//         process.env.SECRET
//       );
//       res.status(200).json({ token, user });
//     } else {
//       res.status(401).json({ message: "Invalid password" });
//     }
//   } else {
//     res.status(401).json({ message: "Invalid email" });;
//   }
// }
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    
    if (user) {
      if (user.tasks && user.tasks.length > 0) {
        // If user has tasks, compare hashed password with plain text password
        const valid = await bcrypt.compare(password.trim(), user.password);
        if (valid) {
          const token = jwt.sign(
            {
              userId: user._id,
              displayName: user.displayName,
            },
            process.env.SECRET
          );
          res.status(200).json({ token, user });
        } else {
          res.status(401).json({ message: "Invalid password" });
        }
      } else {
        // If user doesn't have any tasks, no need to compare passwords
        const token = jwt.sign(
          {
            userId: user._id,
            displayName: user.displayName,
          },
          process.env.SECRET
        );
        res.status(200).json({ token, user });
      }
    } else {
      res.status(401).json({ message: "Invalid email" });
    }
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = {
  AllUsers,
  getUserById,
  addTaskToUser,
  updateTask,
  deleteTask,
  createUser,
  login
};
