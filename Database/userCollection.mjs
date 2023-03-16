import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    userName : String,
    userEmail : {
        type : String,
        unique : true
    },
    userPassword : String,
})

userSchema.methods.hashPassword = async function (userPassword, next) {
    this.userPassword = await bcrypt.hash(userPassword, 10);
    return("Done")
};

const USER = mongoose.model("user", userSchema);

export default USER;