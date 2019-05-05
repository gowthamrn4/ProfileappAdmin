import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfileserviceService } from '../Db_Service/profileservice.service';
import { Profile } from '../Db_Service/profile';
import { RegisterService } from '../register_service/register-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
declare var $: any;
@Component({
  selector: 'app-addinfo',
  templateUrl: './addinfo.component.html',
  styleUrls: ['./addinfo.component.css']
})
export class AddinfoComponent implements OnInit {

  profilename = '';
  user: any = {};
  showDialog = false;
  constructor(
    private _router: Router,
    private profileservice: ProfileserviceService,
    private registerservice: RegisterService,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    
  }

  onsubmit(value) {
    value.profilename = this.profilename;
    console.log(value.profilename)
    this.profileservice.insertProfile(value);
      this.showDialog = true;
  }
  logout() {
    this.registerservice.signOut();
  }
  fileProfileUpload(evt) {
    const that = this;
      const storageRef = firebase.storage().ref();
      evt.stopPropagation();
      evt.preventDefault();
      const file = evt.target.files[0];
      const metadata = {
        'contentType': file.type
      };
      storageRef.child('images/' + this.profilename + '/profilepic').put(file, metadata).then(function(snapshot) {
        const url = snapshot.downloadURL;
        that.user.profilepic = url;
        console.log('File available at', url);
      }).catch(function(error) {
        console.error('Upload failed:', error);
      });
  }
  fileCompanyLogoUpload(evt) {
    const that = this;
      const storageRef = firebase.storage().ref();
      evt.stopPropagation();
      evt.preventDefault();
      const file = evt.target.files[0];
      const metadata = {
        'contentType': file.type
      };
      storageRef.child('images/' + this.profilename + '/companylogo').put(file, metadata).then(function(snapshot) {
        const url = snapshot.downloadURL;
        that.user.companylogo = url;
        console.log('File available at', url);
      }).catch(function(error) {
        console.error('Upload failed:', error);
      });
  }
}


