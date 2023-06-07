import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup ({
    email  :new FormControl ('',[Validators.required, Validators.email]) ,
    password : new FormControl('',Validators.required), 
    
  });
  constructor (private authService:AuthenticationService, private router :Router,){}
  ngOnInit(): void {}
  get email(){
    return this.loginForm.get('email')
  }
  get password(){
    return this.loginForm.get('password')
  }
  submit(){
    if(!this.loginForm.valid) {
      return;
    }

const{email,password}= this.loginForm.value;
const em = String(email);
    const pw = String(password);
this.authService.login(em,pw)
.subscribe (()=>{
  this.router.navigate(['table'])
})
  
 
 
  }
}
