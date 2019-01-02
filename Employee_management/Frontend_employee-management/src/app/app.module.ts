import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes , RouterModule} from '@angular/router';
import {HttpModule  } from '@angular/http';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import {EmpserviceService} from './empservice.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
// import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';


const _r: Routes = [
  { path : 'registration' , component : RegistrationComponent  },
  {path : 'login' , component : LoginComponent },
  {path : 'home' ,  component: HomeComponent },
  {path : 'view/home' ,  component: HomeComponent },
  {path : 'updated/home' ,  component: HomeComponent },
  {path: '' , component: LoginComponent},

  {path : 'view' , component: ViewComponent },
  {path: 'view/:id' , component: ViewComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    ViewComponent
    // DlDateTimePickerDateModule
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(_r)
  ],
  providers: [EmpserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
