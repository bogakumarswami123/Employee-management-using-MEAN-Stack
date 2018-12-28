import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { environment } from '../../environments/environment';
import { EmpserviceService } from '../empservice.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [EmpserviceService]
})
export class HomeComponent implements OnInit {

  users: FormGroup;
  submitted = false;
  employees: any;
  res: any;

  constructor(private _fb: FormBuilder, private _ser: EmpserviceService, private _r: Router) {
    this.users = this._fb.group(
      {
        empid: ['', [Validators.required]],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        address: ['', [Validators.required]],
        dob: ['', [Validators.required]],
        mobile: ['', [Validators.required]],
        city: ['', [Validators.required]],
        _id: [ '']
      });

  }

  ngOnInit() {

    this._ser.getEmployees().subscribe((res) => {
      this.employees = res.data;
    });
  }
  onSubmit(data) {

    this.submitted = true;
    if (this.users.invalid) {
      return;
    }
    console.log(data._id);
    if (data._id !== '' && data._id !== undefined && data._d !== null) {

      this._ser.postUpdate(data).subscribe((res) => {

        if (res.data) {
          this.employees = res.data;
          this.res = res;
        } else {
          this.res = res; }
      });

    } else {
    this._ser.employee(data).subscribe((res) => {

      if (res.data) {
        this.employees = res.data;
        this.res = res;

      } else {
        this.res = res;

      }
    });

    }
     $('#myModal').css('display', 'block');
     $('#modalbody').remove();
     $('#submit').hide();
     $('.modal-title').hide();
     $('#cancel').on('click', function(e) {
      e.preventDefault();
      setTimeout(function() {
           window.location.reload();
      }, 0);
});
    this._r.navigate(['home']);
  }

  delete(id) {
    console.log(id);
    this._ser.deletebyId(id).subscribe((res) => {
      this.employees = res.data;
    });
  }

  update(id) {
    this._ser.getUpdate(id).subscribe((res) => {
      this.users.patchValue(res.user);
      this._r.navigate(['home']);
    });
  }

}
