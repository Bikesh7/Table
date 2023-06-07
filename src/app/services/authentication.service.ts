import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth); // observable that emits the authentication state

  constructor(private auth: Auth) { }
  login(username:string, password:string){   //promise and observable
    return from(signInWithEmailAndPassword(this.auth,username,password)) 
   }
  
  
   signup(name:string, email:string, password:string){ 
    return from(createUserWithEmailAndPassword(this.auth,email,password))
    .pipe (switchMap(({user}) => updateProfile(user, {displayName : name }))
  
  
   )}
  
   logout(){
    return from(this.auth.signOut());
   }
  }
  

