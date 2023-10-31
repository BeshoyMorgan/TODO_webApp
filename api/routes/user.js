var express = require("express");
var router = express.Router();
const userModel = require("../model/user");
const {
  AllUsers,
  getUserById,
  addTaskToUser,
  updateTask,
  deleteTask,
  createUser,
  login,
} = require("../controller/user");

router.get("/", async(req, res, next) => {   // get all users
  try{
    var usersList=await AllUsers()
    res.status(200).json(usersList)
  }catch(err){
    res.status(422).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {   // get user by id
  var id = req.params.id;
    try {
        var user = await getUserById(id);
        res.json( user );
    } catch (error) {
        res.status(422).json({message: error.message});
    }
});

router.post("/signup", createUser);         // add user

 router.post("/:id", addTaskToUser);
 router.patch("/:id",updateTask);
router.delete("/:id",deleteTask);
// router.delete("/:id", async (req, res) => {    // delete user
//   try {
//     var id = req.params.id;
//     var deletedUser = await userModel.deleteOne({
//       _id: id,
//     });
//     res.json(deletedUser);
//   } catch (err) {
//     res.json({ message: err.message });
//   }
// });

router.post("/", login);

module.exports = router;
