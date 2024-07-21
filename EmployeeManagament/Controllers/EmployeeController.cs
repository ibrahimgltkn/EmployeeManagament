using EmployeeManagament.Model;
using Microsoft.AspNetCore.Mvc;
using X.PagedList;

namespace EmployeeManagament.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private static List<Employee> employees = new List<Employee>();
    private static int IncId = 1;

    [HttpGet]
    public ActionResult<PagedResponse<Employee>> GetEmployees(int page = 1, int pageSize = 2)
    {
        var pagedList = employees.ToPagedList(page, pageSize);

        var totalCount = pagedList.TotalItemCount;
        var totalPages = (int)Math.Ceiling((decimal)totalCount / pageSize);

        var response = new PagedResponse<Employee>
        {
            PageNumber = page,
            PageSize = pageSize,
            TotalCount = pagedList.TotalItemCount,
            TotalPage = totalPages,
            List = pagedList
        };

        return Ok(response);
    }

    [HttpGet("{id}")]
    public ActionResult<Employee> GetEmployee(int id)
    {
        var employee = employees.FirstOrDefault(e => e.Id == id);
        return employee != null ? Ok(employee) : NotFound();
    }

    [HttpPost("AddEmployee")]
    public ActionResult<Employee> AddEmployee(Employee employee)
    {
        employee.Id = IncId++;
        employees.Add(employee);
        return Ok($"{employee.Name} başarıyla eklendi");
    }

    [HttpPut("UpdateEmployee/{id}")]
    public IActionResult UpdateEmployee(int id,Employee updatedEmployee)
    {
        var employee = employees.FirstOrDefault(e => e.Id == id);

        if (employee == null) return NotFound();

        employee.Name = updatedEmployee.Name;
        employee.Age = updatedEmployee.Age;
        employee.Department = updatedEmployee.Department;

        return Ok($"{employee.Id} numaralı kayıt güncellendi.");
    }


    [HttpDelete("DeleteEmployee/{id}")]
    public IActionResult DeleteEmployee(int id)
    {
        var employee = employees.FirstOrDefault(e => e.Id == id);
        if (employee == null) return NotFound();

        employees.Remove(employee);
        return Ok($"{employee.Name} isimli kayıt silindi.");
    }
}