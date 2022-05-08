import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authentification/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  myGroup:any
  val: any
  submited=false
  isLoading=false
  token_expired=false
  constructor(private fb:FormBuilder,private authService:AuthService,private route:ActivatedRoute) {
    this.myGroup=  this.fb.group({
      email:['',[Validators.required,Validators.email]]
    })
   }

  ngOnInit(): void {
    this.route.queryParams
   
    .subscribe((params:any) => {
      console.log(params); // { order: "popular" }

      this.token_expired = params.token_expired;
      console.log(this.token_expired); // popular
    }
  );
  }
  submit(){
this.submited=true

if(this.myGroup.valid){
  this.isLoading=true
this.authService.resetPassword(this.myGroup.controls["email"].value)
.subscribe( async(response:any) => {
  this.isLoading=false
  console.log(response)
  if (await response.status ===true) {
   
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
     color: 'green',
      background: '#f4f4f4',
      timer: 3000,
      icon: 'success',
      title: "Message envoyé avec succès",
    
    })
  } else {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
     color: 'red',
      background: '#f4f4f4',
      timer: 3000,
      icon: 'error',
      title: response.message,
    
    })
 
 
  }
});
  }}
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.myGroup.controls[controlName];
    if (!control) {
      return false;
    }
  
    const result = control.hasError(validationType) ;
    return result;
  }
}
