import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpserviceService } from '../empservice.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [EmpserviceService]
})
export class RegistrationComponent implements OnInit {


  minDate = new Date(2000, 0, 1);
   date = new Date();
   cYear = this.date.getFullYear();
    cMonth =  this.date.getMonth();
    cDate = this.date.getDate();
  maxDate =  new Date(this.cYear , this.cMonth , this.cDate);


  registerForm: FormGroup; submitted = false;
  res: any;
  constructor(private _fb: FormBuilder, private _ser: EmpserviceService, private _r: Router) {
    this.registerForm = this._fb.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z]{3,}')]],
        email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{3,}[@]{1}[a-zA-Z]{3,}[.]{1}[a-zA-Z0-9]{2,}')]],
        password: ['', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,18}$')]],
        gender: ['', [Validators.required]],
        address: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        company: ['', [Validators.required]]

      }
    );
  }


  ngOnInit() {
    const now = new Date(),
    maxDate = now.toISOString().substring(0, 10);

    $('#dob').prop('max', maxDate);
  }

  onSubmit(data) {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this._ser.register(data).subscribe((res) => {
      this.res = res;
      $('#msg').css('display', 'block');
      setTimeout(function () {
        $('#msg').fadeOut(1000);
      }, 2000);

      if (this.res.message === true) {

        this._r.navigate(['/home']);
      } else {
        this._r.navigate(['/register']);
      }

    });
  }

}
