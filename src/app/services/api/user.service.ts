import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { User } from 'src/app/models/userModel';
import { environment } from 'src/environments/environment';
import { errorMgmt } from './errorHandling';

@Injectable({
  providedIn: 'root'
})
export class UserService {
protected readonly API=environment.proxy + "/user"

  constructor(private http:HttpClient) { 
  
  }
  create_user(user:User){
   return this.http.post(this.API + "/register",user).pipe(catchError(errorMgmt));
  }
  change_password(user:User,password:string){
    let doc={user,password}
    return this.http.post(this.API + "/change_password", doc).pipe( catchError(errorMgmt));
  }
}
