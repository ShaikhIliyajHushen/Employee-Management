const { Schema, default: mongoose } = require("mongoose");


const employeeSchema = new Schema({
    address: {
        type: String,
        trim: true
    },
    mobile: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    religion: {
        type: String,
        trim: true
    },
    nationality: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    maritalStatus:{
        type: String,
        trim: true
    },

})

const signUpSchema = new Schema({
    firstName: {
        type: String,
        // required: true,
        trim: true
    },
    lastName: {
        type: String,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    personalDetails: employeeSchema,
    password: {
        type: String,
        // required: true,
        trim: true
    },
    picture: {
        type: String,
        trim: true
    },
    authEmail: {
        type: String, 
        trim: true
      },
}, { timestamps: true });






const EmpDetails = mongoose.model('EmpDetails', signUpSchema)
module.exports = EmpDetails;