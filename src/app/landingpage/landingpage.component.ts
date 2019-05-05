import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AngularFireDatabase, listChanges } from 'angularfire2/database';
import { ProfileserviceService } from '../Db_Service/profileservice.service';
import { Profile } from '../Db_Service/profile';
import { RegisterService } from '../register_service/register-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
declare var $: any;
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  profilename = '';
  user: any = {};
  labels:any;
  showDialog = false;
  public profiledbdetails: any;
  public profiledetails: any;
  
  constructor(
    private _router: Router,
    private profileservice: ProfileserviceService,
    private registerservice: RegisterService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
   this.profiledbdetails =this.db.list('/')
   .valueChanges()
   .subscribe(res => {
       console.log(res)//should give you the array of percentage. 
       this.labels = res;
   })
   enum color {red=0,green=1}
  let background = color.red;
  console.log(background)
}
}
