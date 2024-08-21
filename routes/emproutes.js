var express = require('express')
var router = express.Router();


const accountRouter = require("../Controller/AccountController");
const newEmpAccountRouter = require("../Controller/EmployeeController");




router.post('/createAccount',accountRouter.createEmpAccount);
router.post('/login',accountRouter.loginAccount);
router.post('/googleAuth',accountRouter.createGoogleAuthAccount);
router.post('/googleAuthEmail',accountRouter.googleAuthEmail);
router.post ('/setPassword',accountRouter.setPassword)

//
router.post('/newEmpAccount',accountRouter.newEmpAccount);
router.get('/getAllEmp',accountRouter.getAllEmployee);
router.get('/getSingleEmp/:id',accountRouter.getSingleEmp);
router.put('/:id/updateEmpDetails',accountRouter.updateEmpDetails);
router.delete('/:id/deleteEmpDetails',accountRouter.deleteEmpDetails);

router.post('/email',accountRouter.emailController)


//NewEmpAccount
// router.post('/newEmpAccount',newEmpAccountRouter.newEmpAccount);
// router.get('/getAllEmp',newEmpAccountRouter.getAllEmployee);
// router.get('/getSingleEmp/:id',newEmpAccountRouter.getSingleEmp);
// router.put('/:id/updateEmpDetails',newEmpAccountRouter.upadetEmpDetails);
// router.delete('/:id/deleteEmpDetails',newEmpAccountRouter.deleteEmpDetails);










module.exports = router;