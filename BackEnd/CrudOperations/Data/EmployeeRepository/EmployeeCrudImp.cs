using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrudOperations.Context;
using CrudOperations.Model;

namespace CrudOperations.Data.EmployeeRepository
{
    public class EmployeeCrudImp : EmployeeCrud
    {
        private readonly MainContext MainContext;
        public EmployeeCrudImp(MainContext mainContext)
        {
            this.MainContext = mainContext;
        }

        public async Task<Employee> AddEmployee(Employee employee)
        {
            var result = await MainContext.Employee.AddAsync(employee);
            await SaveAsync();
            return result.Entity;
        }

        public async Task DeleteEmployee(int employeeId)
        {
            var result = await FindEmployee(employeeId);
            if (result != null)
            {
                MainContext.Employee.Remove(result);
                await SaveAsync();
            }
        }

        public async Task<IEnumerable<Employee>> GetEmployees()
        {
            return await MainContext.Employee.ToListAsync();
        }


        public async Task<Employee> UpdateEmployee(Employee employee)
        {
            try
            {
                var employeeObj = await FindEmployee(employee.EmployeeId);
                if (employeeObj != null)
                {
                    employeeObj.EmployeeId = employee.EmployeeId;
                    employeeObj.EmployeeName = employee.EmployeeName;
                    employeeObj.EmployeeContact = employee.EmployeeContact;
                    employeeObj.EmployeeAddress = employee.EmployeeAddress;

                    MainContext.Employee.Update(employeeObj);
                    await SaveAsync();

                    return employeeObj;
                }
            }
            catch(Exception e)
            {
                Console.WriteLine("Error: " + e.Message);
            }
            return null;

        }

        public async Task<Employee> FindEmployee(int employeeId)
        {
            var employee = await MainContext.Employee
                    .FirstOrDefaultAsync(e => e.EmployeeId == employeeId);
            return employee;
        }

        public async Task SaveAsync()
        {
            await MainContext.SaveChangesAsync();
        }
    }
}
