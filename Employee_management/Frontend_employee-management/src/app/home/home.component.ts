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

  constructor(private _fb: FormBuilder, private _ser: EmpserviceService, private _r: Router, private router: ActivatedRoute) {
    this.users = this._fb.group(
      {
        empid: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]{3,6}')]],
        empfirstname: ['', [Validators.required , Validators.pattern('^[a-zA-Z ]*$')]],
        emplastname: ['', [Validators.required ,  Validators.pattern('^[a-zA-Z ]*$')]],
        empgender: ['', [Validators.required ]],
        empaddress: ['', [Validators.required ]],
        empdob: ['', [Validators.required]],
        empmobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
        empcity: ['', [Validators.required , , Validators.pattern('^[a-zA-Z ]*$')]],
        _id: ['']
      });


  }


  ngOnInit() {


    const now = new Date(),
      maxDate = now.toISOString().substring(0, 10);
    $('#dob').prop('max', maxDate);

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
          this.res = res;
        }
      });

    } else {
      console.log(data);
      this._ser.employee(data).subscribe((res) => {

        if (res.data) {
          this.employees = res.data;
          this.res = res;

        } else {
          this.res = res;

        }
      });

    }
    //  hide a form data using jquery
    $('#myModal').css('display', 'block');
    $('#modalbody').hide();
    $('#submit').hide();
    $('.modal-title').hide();
    $('#closed').hide();

    $('#cancel').on('click', function () {
      setTimeout(function () {
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
