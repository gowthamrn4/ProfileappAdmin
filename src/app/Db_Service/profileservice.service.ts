import { Injectable } from "@angular/core";
import { Profile } from "../Db_Service/profile";
import { AngularFireDatabase ,AngularFireList} from "angularfire2/database";
@Injectable()
export class ProfileserviceService {
  info:any;
  selectedProfile: Profile = new Profile();
  constructor(private af: AngularFireDatabase) {
    this.info = af.list('/');
  }
  infomations:AngularFireList<any>;
  insertProfile(profile: Profile) {
    profile.youtubeurl = profile.youtubeurl ? profile.youtubeurl : "";
    profile.slideshareurl = profile.slideshareurl ? profile.slideshareurl : "";
    profile.fblink = profile.fblink ? profile.fblink : "";
    profile.gpluslink = profile.gpluslink ? profile.gpluslink : "";
    profile.twitterlink = profile.twitterlink ? profile.twitterlink : "";
    profile.linkedin = profile.linkedin ? profile.linkedin : "";
    this.af.object("/" + profile.profilename).update(profile);
  }
  getdata(){
   this.infomations = this.af.list("/")
   return this.infomations.snapshotChanges();
  }
}
