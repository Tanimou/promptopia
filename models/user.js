import {Schema,model,models} from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
        trim: true,
    },

    
    email: {
        type: String,
        required: [true,"Email is required"],
        unique:[true,"Email already exists"],
        
    },
    // password: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minLength: 3,
    //     maxLength: 50,
    // },
    image: {
        type: String,
    }
    
})

const User = models.User || model("User", userSchema);

export default User