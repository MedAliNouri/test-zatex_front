import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkeletonModule} from 'primeng/skeleton';
import { AuthRoutingModule } from './auth-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {ButtonModule} from 'primeng/button';
import {PasswordModule} from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MailValidationComponent } from './mail-validation/mail-validation.component';
import {InputNumberModule} from 'primeng/inputnumber';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  declarations: [

    RegisterComponent,
    LoginComponent,
    ResetPasswordComponent,
    MailValidationComponent,
    ChangePasswordComponent
  ],
  imports: [
    SkeletonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    AuthRoutingModule,
    InputNumberModule
  ]
})
export class AuthModule { }
