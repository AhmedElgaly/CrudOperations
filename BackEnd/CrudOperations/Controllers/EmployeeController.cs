using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrudOperations.Data.EmployeeRepository;
using CrudOperations.Model;

namespace CrudOperations.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeCrud employeeCrud;

        public EmployeeController(EmployeeCrud employeeCrud)
        {
            this.employeeCrud = employeeCrud;
        }

        [HttpGet]
        public async Task<IActionResult> AllEmployees()
        {
            try
            {
                var employees = await employeeCrud.GetEmployees(); 
                return Ok(employees);
            }
            catch (Exception e)
            {
                
                return BadRequest(e); 
            }
            
        }
        [HttpGet("{empId}")]
        public async Task<IActionResult> FindEmployee(int empId)
        {
             try
            {
                var employee = await employeeCrud.FindEmployee(empId);
                return Ok(employee);
            }
            catch (Exception e)
            {
                
                return BadRequest(e); 
            }
            
        }
        [HttpPost]
        public async Task<IActionResult> AddEmployee(Employee employee)
        {
            if (employee == null)
            {
                return NotFound();
            }
            try
            {
                var emp = await employeeCrud.AddEmployee(employee);
                return Ok(emp);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest("Not a valid employee id");
            }

            var newEmp = await employeeCrud.UpdateEmployee(employee);

            return Ok(newEmp);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Not a valid employee Id");
            }   

            var employee = await employeeCrud.FindEmployee(id);
            if (employee == null)
            {
                return NotFound();
            }

            await employeeCrud.DeleteEmployee(employee.EmployeeId);

            return Ok("Employee Deleted");
        }

    }
}
