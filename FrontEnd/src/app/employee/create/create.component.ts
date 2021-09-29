import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
   
  constructor(
    public employeeService: EmployeeService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      EmployeeName: new FormControl('', [Validators.required]),
      EmployeeAddress: new FormControl('', Validators.required),
      EmployeeContact: new FormControl('', Validators.required),
    });
  }

  get getForm(){
    return this.form.controls;
  }
  submit(){
    this.employeeService.create(this.form.value).subscribe(res => {
         this.router.navigateByUrl('employee/index');
    })
  }

}
