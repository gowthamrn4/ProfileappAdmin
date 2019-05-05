import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterService } from './register_service/register-service.service';
import { LandingpageComponent } from './landingpage/landingpage.component' ;
import { ProfileserviceService } from './Db_Service/profileservice.service';
import { DialogComponent } from './dialog/dialog.component';
import { AddinfoComponent } from './addinfo/addinfo.component';
import { ViewlistComponent } from './viewlist/viewlist.component';

const routes:Routes =[
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'landingpage',component:LandingpageComponent},
  {path:'addinfo',component:AddinfoComponent},
  {path:'viewlist/:id',component:ViewlistComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingpageComponent,
    DialogComponent,
    AddinfoComponent,
    ViewlistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseconfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  providers: [RegisterService,ProfileserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
