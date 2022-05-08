import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { MailValidationComponent } from './mail-validation/mail-validation.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [{path:'',children:[
  {path:'',redirectTo:"/auth/login",pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'mailValidation',component:MailValidationComponent},
  {path:'register',component:RegisterComponent},
  {path:'send_mail_reset_pass',component:ResetPasswordComponent},
  {path:'reset_pass/:id',component:ChangePasswordComponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

