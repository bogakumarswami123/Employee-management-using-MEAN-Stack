import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EmpserviceService } from '../empservice.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [EmpserviceService]
})
export class LoginComponent implements OnInit {

  loginForm: any;
  submitted = false;
  res: any;

  constructor(private _r: Router, private _ser: EmpserviceService, private _fb: FormBuilder) {
    this.loginForm = this._fb.group(
      {
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });

  }

  ngOnInit() {
  }
  onSubmit(data) {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    console.log(data);
    this._ser.login(data).subscribe((res) => {


      this.res = res;
      $('#msg').css('display', 'block');
      setTimeout(function () {
        $('#msg').fadeOut(1000);
      }, 2000);

      if (this.res.status === true) {
        this._r.navigate(['/home']);
      } else {

        this._r.navigate(['/login']);
      }

    });
  }

}
