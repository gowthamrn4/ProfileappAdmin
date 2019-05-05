import { Injectable } from "@angular/core";
// import { Http,Headers } from '@angular/http';
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { error } from "selenium-webdriver";

@Injectable()
export class RegisterService {
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUserName(): string {
    return this.authState["email"];
  }
  get currentUser(): any {
    return this.authState !== null ? this.authState : null;
  }
  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : "";
  }

  // Returns
  get currentUserObservable(): any {
    return this.afAuth.authState;
  }

  // Anonymous User
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.isAnonymous : false;
  }

  // Returns current user display name or Guest
  get currentUserDisplayName(): string {
    if (!this.authState) {
      return "Guest";
    } else if (this.currentUserAnonymous) {
      return "Anonymous";
    } else {
      return this.authState["displayName"] || "user without a name";
    }
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string, profilename: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        this.updateUserData(profilename);
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(["/login"]);
  }
  private updateUserData(profilename): void {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features

    let path = `users`;
    let data = {
      userid: this.currentUserId,
      email: this.authState.email,
      profilename: profilename
    };
    this.db.list(path).push(data);
  }
}
