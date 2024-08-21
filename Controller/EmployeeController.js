// const EmployeeSchema = require('../Model/EmployeeSchema');
// const { default: mongoose } = require('mongoose');


// let newEmpAccount = async (req, res, next)=> {
//     // const { email } = req.body;
//     // EmployeeSchema.findOne({ email: email })
//     //     .then(async existingUser => {
//     //         if (existingUser) {
//     //             return res.send({ message: 'Email already exists' });
//     //         }
//             let card = new EmployeeSchema(req.body);
//             try {
//                 const response = await card.save();
//                 res.status(200).send(response)
//             } catch (err) {
//                 res.status(404).send(err)
//             }
//         // })
// };


// const getAllEmployee = async (req, res, next) => {
//     try {
//         // const data = await EmployeeSchema.find({});
//         const data = await EmployeeSchema.find({}).sort({ createdAt: -1 });
//         return res.send({ data });
//     } catch (err) {
//         next(err);
//     }
// };

// const getSingleEmp = async (req, res, next) => {
//     const singleEmployeeId = req.params.id;
//     try {
//         const employee = await EmployeeSchema.findById(singleEmployeeId);
//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found' });
//         }
//         return res.status(200).json({ data: employee });
//     } catch (err) {
//         next(err);
//     }
// };


// const upadetEmpDetails = async (req, res, next) => {
//     // console.log(req.params.id);
//     // console.log(req.body);
//     try {
//         const id = req.params.id;
//         const body = req.body;
//         let updateFields = {};

//         if (body.firstName || body.lastName || body.email || body.Address || body.Mobile) {
//             updateFields.firstName = body.firstName;
//             updateFields.lastName = body.lastName;
//             updateFields.email = body.email;
//             updateFields.Address = body.Address;
//             updateFields.Mobile = body.Mobile;
//         }

//         if (Object.keys(updateFields).length === 0) {
//             return res.status(400).json({ error: "No valid fields provided for update." });
//         }

//         const updatedData = await EmployeeSchema.findByIdAndUpdate(id, updateFields, { new: true });
//         res.status(200).json({ data: updatedData });
//     } catch (err) {
//         res.status(422).send(err);
//     }
// };

// const deleteEmpDetails = async (req, res, next) => {
//     console.log(req.params.id);
//     try {
//         const id = req.params.id;
//         const deletedData = await EmployeeSchema.findByIdAndDelete(id);

//         if (!deletedData) {
//             return res.status(404).json({ error: "Employee not found" });
//         }

//         res.status(200).json({ message: "Employee deleted successfully", data: deletedData });
//     } catch (err) {
//         res.status(422).send(err);
//     }
// };


// module.exports = {newEmpAccount,getAllEmployee, getSingleEmp, upadetEmpDetails,deleteEmpDetails}
