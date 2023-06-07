import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export function passwordsValidator (): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword= control.get('confirmPassword')?.value;
    if(password && confirmPassword && password !== confirmPassword ) {
      return {
        passwordDontMath : true
      }
    }else {

      return null;
    }

  };
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm= new FormGroup ({
    name: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    
    

  },
  {validators: passwordsValidator() })  //cross field validators use 2 feilds  and going form a validation based on it

  ngOnInit(): void {}
  
  

 constructor (private authService:AuthenticationService, private router : Router ) {}
  get name(){
    return this.signupForm.get('name');
  }
  get email(){
    return this.signupForm.get('email');
  }

  get Password(){
    return this.signupForm.get('password');
  }
  get confirmPassword (){
    return this.signupForm.get('confirmPassword')
  }
  

  submit(){
    if(!this.signupForm.valid) return ;
    
   
    


    const{name, email,password}= this.signupForm.value;

    console.log(name,email,password);
    
    this.authService.signup(name!, email!, password!).subscribe(()=>{
      this.router.navigate(['table'])
    })

  }


}
