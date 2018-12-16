import {Component, ViewChild} from '@angular/core';
import {HttpService} from './http.service';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild('i') audiod;
  records = [];

  constructor(private httpServie: HttpService) {
  }

  ngOnInit() {
    this.httpServie.getRecords()
      .subscribe((records) => {
        this.records = records['records'];
      });
  }



}
