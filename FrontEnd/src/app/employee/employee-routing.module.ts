import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';


const routes: Routes = [
  { path: 'employee', redirectTo: 'employee/index', pathMatch: 'full'},
  { path: 'employee/index', component: IndexComponent },
  { path: 'employee/:empId/delete', component: DeleteComponent },
  { path: 'employee/create', component: CreateComponent },
  { path: 'employee/:empId/edit', component: EditComponent } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
