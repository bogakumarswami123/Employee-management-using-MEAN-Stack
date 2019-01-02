import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpserviceService } from '../empservice.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id: any;
  res: any;

  constructor( private _ar: ActivatedRoute , private _ser: EmpserviceService) { }

  ngOnInit() {

    this.id = this._ar.snapshot.params.id;
    console.log(this._ar.snapshot.params.id);
    if (this._ar.snapshot.params.id !== undefined && this._ar.snapshot.params.id != null && this._ar.snapshot.params.id !== '') {
         this._ser.getView(this._ar.snapshot.params.id).subscribe((res) =>  {
           this.res = res.user;
       });
    }

}
  }

