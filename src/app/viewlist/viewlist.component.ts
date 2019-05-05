import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { AngularFireDatabase, listChanges } from 'angularfire2/database';
import { ProfileserviceService } from '../Db_Service/profileservice.service';
import { Profile } from '../Db_Service/profile';
import { RegisterService } from '../register_service/register-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css']
})
export class ViewlistComponent implements OnInit {
  sub:any;
  profilename = '';
  user: any;
  findimage:any;
  dataList:any;
  showDialog = false;
  public profiledbdetails: any;
  public profiledetails: any;
  constructor(
    private _router: Router,
    private profileservice: ProfileserviceService,
    private registerservice: RegisterService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const category = this.route.snapshot.params["id"];
 
    this.profiledbdetails =this.db.object('/'+category)
   .valueChanges()
   .subscribe(res => {
       console.log(res)//should give you the array of percentage. 
       this.user = res;
   })
}
}
