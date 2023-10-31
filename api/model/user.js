const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const productModel = require("./product");

const userSchema = mongoose.Schema(
  
  {
    
    name: {
      type: String,
      minLength: 3,
       maxLength: 20,
       
    },
    email: {
      type: String,
        unique: true,
      required:true
    },
    password: {
      type: String,
       required: true,
    },
    tasks:{
      type:[{
      
        name: {
          type: String,
        },
        date: {
          type: String,
           
        },
        note: {
          type: String,
           
        },
        status: {
          type:String ,
          enum:["active","complete"]
           
        },
        type: {
          type: String,
          enum:["personal","learning","helth"]
           
        },      
    
      }],
    default:[]
    }
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});


const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
