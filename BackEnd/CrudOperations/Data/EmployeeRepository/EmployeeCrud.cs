using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrudOperations.Data.DAO;
using CrudOperations.Model;

namespace CrudOperations.Data.EmployeeRepository
{
    public interface EmployeeCrud:Database
    {
        Task<IEnumerable<Employee>> GetEmployees();
        Task<Employee> FindEmployee(int employeeId);
        Task<Employee> AddEmployee(Employee employee);
        Task<Employee> UpdateEmployee(Employee employee);
        Task DeleteEmployee(int employeeId);
    }
}
