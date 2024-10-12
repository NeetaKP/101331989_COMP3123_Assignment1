const express = require('express');
const modelEmp = require('../models/employees');
const routesEmp = express.Router();




// get all employees
routesEmp.get('/employees', async (req,res) => {
    try{
        const employees = await modelEmp.find();
        res.status(200).send(employees);
    } catch (error) {
        ers.status(500).send({
            message: error.message
        });
    }
})
 
// add new employee
routesEmp.post('/employees', async (req,res) => {
    const {first_name, last_name, email, position, salary, date_of_joining, department} = req.body;
    if(Object.keys(req.body).length === 0){
        return ers.status(400).send("Employee content is empty.")
    }
    try{
        const employeeObj = new modelEmp(req.body);
        employeeObj.createdAt = new Date();
        await employeeObj.save();
        res.status(201).send({
            message: "Employee created successfully.",
            employee_id: employeeObj._id
        });

    } catch (error) {
        if(!first_name || !last_name || !email || !position || !salary){
            return res.status(400).send({
                message: "Fiels (first name, last name, email, position, salary) are required."
            });
        } else if (isNaN(salary)){
            return res.status(400).send({
                message: "Salary must be a number"
            });
        }
        res.status(500).send({
            message: `Error: ${error.message}` 
        });
    }
})

// get employee information for an employee id
routesEmp.get('/employees/:empid', async (req,res) => {
    const id = req.params.empid;
    try{
        const empObj = await modelEmp.findById(id);
        res.status(200).send(empObj);
    } catch (error) {
        res.status(500).send({
            message: `Cannot find employee with id: ${id}.`
    });
    }
})

// update employee information for an employee id
routesEmp.put('/employees/:empid', async (req,res) => {
    const {first_name, last_name, email, position, salary, department} = req.body;
    const id = req.params.empid;
    if(Object.keys(req.body).length === 0){
        return res.status(400).send("Empty employ update data");
    }
    try{
        const empObj = await modelEmp.findById(id);
        if(!empObj){
            throw new Error(`Employee with id ${id} does not exist.`).name = "EmployeeIdError.";
        }
        if(first_name && first_name === ""){
            throw new Error("First name cannot be emtpy").name = "EmployeeFirstNameError.";
        }
        if(last_name && last_name === ""){
            throw new Error("Last name cannot be empty").name = "EmployeeLastNameError.";
        }
        if(email && email === ""){
            throw new Error("Email cannot be empty").name = "EmployeeEmailError.";
        }
        if(position && position === ""){
            throw new Error("Position cannot be empty").name = "EmployeePositionError.";
        }
        if(isNaN(salary)){
            throw new Error("Salary cannot be empty").name = "EmployeeSalaryError.";
        }
        if(department && department === ""){
            throw new Error("Position cannot be empty").name = "EmployeePositionError.";
        }

        await modelEmp.findByIdAndUpdate(id,req.body);
        await modelEmp.findByIdAndUpdate(id,{updatedAt: new Date()});
        //await modelEmp.save();
        res.status(200).send({
            message: `Employee Id ${id} is updated`
        })
    }catch(error){
        res.status(500).send({
            message: `Error: ${error.message}`
        });
    }
})

// delete an employee
routesEmp.delete('/employees', async (req, res) => {
    try{
        const id = req.query._id;
        const objectEmp = await modelEmp.findByIdAndDelete(id);
        if(objectEmp){
            res.status(204).send({
                message: `Employee deleted successfully`
            })
        }else{
            res.status(500).send({
                message: `Employee with id ${id} does not exist`
            })
        }
    } catch(error) {
        res.status(500).send({
            message: `Error ${e.message}`
        })
    }
})

module.exports = routesEmp