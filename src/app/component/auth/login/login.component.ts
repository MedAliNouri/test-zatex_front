import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentification/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  contactForm: any
  submited=false
  isLoading=false
  constructor(private fb:FormBuilder,private router:Router,private authService:AuthService) { 
  this.contactForm=  this.fb.group({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    console.log('work')
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.contactForm.controls[controlName];
    if (!control) {
      return false;
    }
  
    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
  submit(){
    this.submited=true
    this.isLoading=true
    const controls = this.contactForm.controls;
    if (this.contactForm.invalid) {
      Object.keys(controls).forEach(controlName =>
         controls[controlName].markAsTouched()
       );
       this.isLoading=false
      return;
      }
      console.log(this.contactForm.value)
      this.authService.login(this.contactForm.value).subscribe((res:any)=>{
        this.isLoading=false
        console.log(res)
        if(res.status==false){
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
           color: 'red',
            background: '#f4f4f4',
            timer: 3000,
            icon: 'error',
            title: res.data,
          
          })
          
        }else{
          console.log(res.data.user.isVerified)
          // if(!res.data.user.isVerified){
          //   this.router.navigateByUrl('/auth/mailValidation')
          //   Swal.fire({
          //     toast: true,
          //     position: 'top-end',
          //     showConfirmButton: false,
          //    color: 'red',
          //     background: '#f4f4f4',
          //     timer: 3000,
          //     icon: 'error',
          //     title: "votre compte n'est pas vérifier",
            
          //   })
          //   return
          // }
          this.authService.storeLogedUser(res.data)
          this.router.navigateByUrl('/')
        }
        console.log(res)
      })

  }
}
