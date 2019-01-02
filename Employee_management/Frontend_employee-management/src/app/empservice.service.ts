import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class EmpserviceService {

  // myMethod$: Observable<any>;
  // private myMethodSubject = new Subject();
  //  myMethod$ = this.myMethodSubject.asObservable();



  constructor(private _http: Http)  {
  }



  register(data) {
    console.log(data);

    return this._http.post('http://localhost:3000/register', data).pipe(map((res: Response) => {
      return res.json();
    }));

  }

  login(data) {
    console.log(data);

    return this._http.post('http://localhost:3000/login', data).pipe(map((res: Response) => {
      return res.json();
    }));

  }

  employee(data) {
    console.log(data);

    return this._http.post('http://localhost:3000/employees', data).pipe(map((res: Response) => {
      return res.json();
    }));

  }

  getEmployees() {

    return this._http.get('http://localhost:3000/employees/getemployees', null).pipe(map((res: Response) => {
      return res.json();
    }));
  }

  deletebyId(id) {
    return this._http.get('http://localhost:3000/employees/employee/' + id, null).pipe(map((res: Response) => {
      return res.json();
    }));

  }
  getUpdate(id) {
    return this._http.get('http://localhost:3000/employees/update/' + id, null).pipe(map((res: Response) => {
      return res.json();
    }));
  }
  postUpdate(data) {

    return this._http.post('http://localhost:3000/employees/update', data).pipe(map((res: Response) => {
      return res.json();
    }));

  }
  getView(id) {
    return this._http.get('http://localhost:3000/employees/viewbyid/' + id, null).pipe(map((res: Response) => {
      return res.json();
    }));

  }
}
