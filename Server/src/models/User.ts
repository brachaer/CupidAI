import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "Must provide email"],
        trim: true,
        maxlength:[254,"Email can not be more than 254 characters"],
        validate: {
            validator: function (value: string) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: "Invalid email format. Please provide a valid email address.",
        },
    },
    depiction:{
        type: String,
        required: [true, "Must provide depiction"],
        trim: true,
        minlength:[40,"Depiction can not be shorter than 40 characters"],
        validate: {
            validator: function (value: string) {
                return value.length > 40;
            },
            message: "Depiction must be longer than 40 characters.",
        },
    },
    keywords: {
        type: [String],
        default: [],
    },
    idealPartnerKeywords: {
        type: [String],
        default: [] 
    },
    partnerLocations: { 
        type: [String], 
        default: ["Bars","Beach", "Airport"] 
    },
});


const User= mongoose.model('User', userSchema);

export default User;