const SignUpSchema = require('../Model/SignUpSchema');
const EmployeeSchema = require('../Model/EmployeeSchema');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const sendEmail = require('./EmailService')


// let createEmpAccount = function (req, res, next) {
//   const { email } = req.body;
//   SignUpSchema.findOne({ email: email })
//     .then(async existingUser => {
//       if (existingUser) {
//         return res.send({ message: 'Email already exists' });
//       }
//       let card = new SignUpSchema(req.body);
//       let newEmp = new EmployeeSchema(req.body);
//       try {
//         const response = await card.save();
//         const res = await newEmp.save();

//         // res.status(200).send(response)
//         res.status(200).send({
//           message: 'Account created successfully',
//           response: response,
//           res: res
//         });

//       } catch (err) {
//         res.status(404).send(err)
//       }
//     })
// };

let createEmpAccount = async function (req, res, next) {
  const { email } = req.body;
  try {
    // Check if the email already exists in SignUpSchema
    const existingUser = await SignUpSchema.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    // Create a new entry in SignUpSchema
    let signupCard = new SignUpSchema(req.body);
    const signupResponse = await signupCard.save();
    // Create a new entry in EmployeeSchema
    let employeeCard = new EmployeeSchema(req.body);
    const employeeResponse = await employeeCard.save();

    // Send the responses of both operations
    res.status(200).send({
      message: 'Account created successfully',
      signupResponse: signupResponse,
      employeeResponse: employeeResponse
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

let newEmpAccount = async (req, res, next)=> {
          let card = new SignUpSchema(req.body);
          try {
              const response = await card.save();
              res.status(200).send(response)
          } catch (err) {
              res.status(404).send(err)
          }
      // })
};

const createGoogleAuthAccount = async (req, res) => {
  const { email, name, picture } = req.body;

  if (!email || !name || !picture) {
    return res.status(400).send({ message: 'Incomplete user data' });
  }

  try {
    const existingUser = await SignUpSchema.findOne({ email });

    if (existingUser) {
      return res.status(200).send({ message: 'Email identified successfully' });
    } else {
      const [firstName, lastName] = name.split(' ');
      const googleAuth = new SignUpSchema({ email, firstName, lastName, picture, authEmail: email });

      let employeeCard = new EmployeeSchema({ email, firstName, lastName});
       await employeeCard.save();

      const authRes = await googleAuth.save();

      res.status(200).send({ message: 'Account created successfully. Later set your password.', authRes });
    }
  } catch (error) {
    console.error('Error saving user details:', error);
    res.status(500).send({ message: 'Internal server error', error: error.message });
  }
};

const loginAccount = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await SignUpSchema.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.email === email && !user.password) {
      return res.status(400).json({ message: 'Please set your password and try again' });
    }

    if (user.password && user.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
    }, 'secret_key');

    res.json({
      token: token,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id
    });

  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).send('Internal Server Error');
  }
};

const googleAuthEmail = async (req, res) => {
  const { email} = req.body;
  try {
    const user = await SignUpSchema.findOne({ email: email });

    if (user.email === email && !user.password) {
      return res.status(200).json({ message: 'Please set your password and try again' });
    }

    if(user.email === email){
      return res.status(200).json({ message: 'Enter your password'});
    }

  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).send('Internal Server Error');
  }
};

const setPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await SignUpSchema.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).send('Internal Server Error');
  }
};

const getAllEmployee = async (req, res, next) => {
  try {
      const data = await SignUpSchema.find({}).sort({ createdAt: -1 });
      return res.send({ data });
  } catch (err) {
      next(err);
  }
};

const getSingleEmp = async (req, res, next) => {
  const singleEmployeeId = req.params.id;
  try {
      const employee = await SignUpSchema.findById(singleEmployeeId);
      if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
      }
      return res.status(200).json({ data: employee });
  } catch (err) {
      next(err);
  }
};


// const upadetEmpDetails = async (req, res, next) => {
 
//   try {
//       const id = req.params.id;
//       const body = req.body;
//       let updateFields = {};

//       if (body.firstName || body.lastName || body.email || body.Address || body.Mobile) {
//           updateFields.firstName = body.firstName;
//           updateFields.lastName = body.lastName;
//           updateFields.email = body.email;
//           updateFields.Address = body.Address;
//           updateFields.Mobile = body.Mobile;
//       }

//       if (Object.keys(updateFields).length === 0) {
//           return res.status(400).json({ error: "No valid fields provided for update." });
//       }

//       const updatedData = await SignUpSchema.findByIdAndUpdate(id, updateFields, { new: true });
//       res.status(200).json({ data: updatedData });
//   } catch (err) {
//       res.status(422).send(err);
//   }
// };

// const upadetEmpDetails = async (req, res, next) => {
//   try {
//       const id = req.params.id;
//       const body = req.body;
//       let updateFields = {};

//       if (body.firstName || body.lastName || body.email) {
//           updateFields.firstName = body.firstName;
//           updateFields.lastName = body.lastName;
//           updateFields.email = body.email;
//       }

//       let personalDetailsUpdateFields = {};

//       if (body.address || body.mobile || body.date || body.religion || body.nationality || body.gender || body.maritalStatus) {
//           personalDetailsUpdateFields = {
//               'personalDetails.address': body.address,
//               'personalDetails.mobile': body.mobile,
//               'personalDetails.date': body.date,
//               'personalDetails.religion': body.religion,
//               'personalDetails.nationality': body.nationality,
//               'personalDetails.gender': body.gender,
//               'personalDetails.maritalStatus': body.maritalStatus
//           };

//           // Remove undefined fields
//           Object.keys(personalDetailsUpdateFields).forEach(key => {
//               if (personalDetailsUpdateFields[key] === undefined) {
//                   delete personalDetailsUpdateFields[key];
//               }
//           });
//       }

//       if (Object.keys(updateFields).length === 0 && Object.keys(personalDetailsUpdateFields).length === 0) {
//           return res.status(400).json({ error: "No valid fields provided for update." });
//       }

//       const updatedData = await SignUpSchema.findByIdAndUpdate(id, { 
//           $set: { ...updateFields, ...personalDetailsUpdateFields }
//       }, { new: true });

//       res.status(200).json({ data: updatedData });
//   } catch (err) {
//       res.status(422).send(err);
//   }
// };

const updateEmpDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    let updateFields = {};

    if (body.firstName) updateFields.firstName = body.firstName;
    if (body.lastName) updateFields.lastName = body.lastName;
    if (body.email) updateFields.email = body.email;

    let personalDetailsUpdateFields = {};
    if (body.personalDetails.address) personalDetailsUpdateFields['personalDetails.address'] = body.personalDetails.address;
    if (body.personalDetails.mobile) personalDetailsUpdateFields['personalDetails.mobile'] = body.personalDetails.mobile;

    Object.keys(personalDetailsUpdateFields).forEach(key => {
      if (personalDetailsUpdateFields[key] === undefined) {
        delete personalDetailsUpdateFields[key];
      }
    });

    if (Object.keys(updateFields).length === 0 && Object.keys(personalDetailsUpdateFields).length === 0) {
      return res.status(400).json({ error: "No valid fields provided for update." });
    }

    const updatedData = await SignUpSchema.findByIdAndUpdate(
      id,
      { $set: { ...updateFields, ...personalDetailsUpdateFields } },
      { new: true }
    );

    res.status(200).json({ data: updatedData });
  } catch (err) {
    res.status(422).send(err);
  }
};


const deleteEmpDetails = async (req, res, next) => {
  console.log(req.params.id);
  try {
      const id = req.params.id;
      const deletedData = await SignUpSchema.findByIdAndDelete(id);

      if (!deletedData) {
          return res.status(404).json({ error: "Employee not found" });
      }

      res.status(200).json({ message: "Employee deleted successfully", data: deletedData });
  } catch (err) {
      res.status(422).send(err);
  }
};

const emailController = async (req, res, next) =>{
  try {
    const { to, subject, html } = req.body;
    console.log(req.body)
    await sendEmail(to, subject, html);
    res.status(200).send('Email sent');
  } catch (error) {
    console.error('Error sending email:', error); 
    res.status(500).send('Error sending email');
  }
}

module.exports = loginAccount;

module.exports = { createEmpAccount,newEmpAccount, loginAccount, createGoogleAuthAccount, googleAuthEmail ,setPassword,

  getAllEmployee,getSingleEmp,updateEmpDetails,deleteEmpDetails, emailController
}