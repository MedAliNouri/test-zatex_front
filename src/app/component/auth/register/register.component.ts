import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/api/user.service';
import { ConfirmedValidator } from 'src/app/shared/formValidators/passwordMatch';
import Swal from "sweetalert2";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  submited=false
  isLoading=false
  constructor(private fb:FormBuilder,private userService:UserService,private router:Router) { 
  this.registerForm=  this.fb.group({
    name_lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required,Validators.min(6)]),
      confirmationPassword: new FormControl('', [Validators.required]),
    }, { 
      validator: ConfirmedValidator('password', 'confirmationPassword')
    }
    )
  }

  ngOnInit(): void {
    console.log('work')
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.registerForm.controls[controlName] ;
    if (!control) {
      return false;
    }
  
    const result = control.hasError(validationType) && (control.dirty || control.touched)
    return result;
  }
  submit(){
    this.submited=true
    const controls = this.registerForm.controls;
    if (this.registerForm.invalid) {
      Object.keys(controls).forEach(controlName =>
         controls[controlName].markAsTouched()
       );
      return;
      }
 
      this.isLoading=true
      console.log(this.registerForm.value)
this.userService.create_user(this.registerForm.value).subscribe((res:any)=>{
  this.isLoading=false
  if(res.status==false){
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
     color: 'red',
      background: '#f4f4f4',
      timer: 3000,
      icon: 'error',
      title: res.message,
    
    })
    return
  }
  Swal.fire({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
   color: 'green',
    background: '#f4f4f4',
    timer: 3000,
    icon: 'success',
    title: "acount successfuly created ",
  
  })
this.router.navigateByUrl('auth/mailValidation')
})

    
   
  }
}
