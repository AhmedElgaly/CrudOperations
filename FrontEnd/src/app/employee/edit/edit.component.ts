import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  empId: number;
  employee: Employee;
  form: FormGroup;
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
    
    this.form = new FormGroup({
      EmployeeId:new FormControl('', [Validators.required]),
      EmployeeName: new FormControl('', [Validators.required]),
      EmployeeAddress: new FormControl('', Validators.required),
      EmployeeContact: new FormControl('', Validators.required),
    });
  }

  get getForm(){
    return this.form.controls;
  }

  submit(){
    this.employeeService.update(this.empId, this.form.value).subscribe(res => {
         this.router.navigateByUrl('employee/index');
    })
  }

}
