import {Component, ViewChild} from '@angular/core';
import {HttpService} from './http.service';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  records = [];

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.getRecords()
      .subscribe((records) => {
        this.records = records['records'];
      });
  }



}
