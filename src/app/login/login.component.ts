import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { RegisterService } from '../register_service/register-service.service';


@Component({
  selector: 'app-login',
  
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
 
})
export class LoginComponent implements OnInit {
    email='';
    password='';
    // errorMessage='';
    error:{name:string,message:string} = {name:'',message:''};
  constructor(
    public registerservice:RegisterService,
    private _router:Router) { }

  ngOnInit() {
   
  }
  ClearErrorMessage(){
    // this.errorMessage = '';
    this.error = {name:'',message:''};
  }
 login():void{
   this.ClearErrorMessage()
  //  if(this.validateForm(this.email,this.password)){
    this.registerservice.emailLogin(this.email,this.password)
    .then(() => {
     this._router.navigate(['/landingpage']);
   }).catch(_error =>{
     this.error = _error
     this._router.navigate(['/login'])
   })
  //  }
   
  }
  
  // validateForm(email:string,password:string):boolean{
    
  //   if(email.length === 0){
  //      this.errorMessage = 'please enter Mail'
  //      return false
  //     } 
  //   if(password.length === 0){
  //     this.errorMessage = 'Please enter password'
  //     return false
  //   }
  //   if(password.length < 5){
  //     this.errorMessage = 'Password should be at least 5 characters!'
  //     return false
  //   }
  //   this.errorMessage = ''
  //   return true
  // }
}
