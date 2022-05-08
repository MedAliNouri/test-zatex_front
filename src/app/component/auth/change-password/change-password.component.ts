import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/userModel';
import { UserService } from 'src/app/services/api/user.service';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { ConfirmedValidator } from 'src/app/shared/formValidators/passwordMatch';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form!: FormGroup
  submited = false
  isLoading = false
  token_ecpired = false
  user!: User
  token_recieved = true
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private userService:UserService) {
    this.form = this.fb.group({
     
      password: new FormControl('', [Validators.required, Validators.min(6)]),
      confirmationPassword: new FormControl('', [Validators.required]),
    }, {
      validator: ConfirmedValidator('password', 'confirmationPassword')
    }
    )
  }

  ngOnInit(): void {
    console.log(this.token_recieved)
    this.authService.get_token_reset_pass(this.route.snapshot.params['id']).subscribe((res: any) => {
      this.token_recieved = false
      console.log(res)
      if (!res.status) {
        this.token_ecpired = true
       this.router.navigate(['/auth/send_mail_reset_pass'], { queryParams: { token_expired: true } });
      }
      console.log(res)
      this.user = res.message.user
    })
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched)
    return result;
  }
  submit() {
    this.submited = true
    const controls = this.form.controls;
    console.log(this.form)
    if (this.form.invalid) {
      Object.keys(controls).forEach(controlName =>
         controls[controlName].markAsTouched()
       );
      return;
      }
    this.userService.change_password(this.user,this.form.controls['password'].value).subscribe((res:any)=>{
      if(res.status==false){
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
         color: 'red',
          background: '#f4f4f4',
          timer: 3000,
          icon: 'error',
          title: "error updating",
        
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
        title: "password successfuly updated ",
      
      })
      this.router.navigateByUrl("/")
    })
  }
}
