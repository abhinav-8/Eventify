import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required: true,
        maxLength:50,
        trim:true
    },
    lastName : {
        type:String,
        minLength:3,
        maxLength:50,
        trim:true
    },
    userName : {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:50,
        lowercase:true,
    },
    //In password validator can be added for the reggex thing but for now 
    // keeping it simple
    password : {
        type:String,
        required:true,
        trim:true,
        minLength:6,
    },
})

const User = mongoose.model("User",UserSchema);
export default User;