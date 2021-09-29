import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  empId: number;
  employee: Employee;

   
  constructor(
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
  
  ngOnInit(): void {
    this.empId = this.route.snapshot.params['empId'];
    this.employeeService.find(this.empId).subscribe((data: Employee)=>{
      this.employee = data;
    });
  }
  delete(Id){
    this.employeeService.delete(Id).subscribe(res => {
         this.router.navigateByUrl('employee/index');
    })
  }

}
