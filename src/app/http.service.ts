import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpService {

  records;

  constructor(private httpClient: HttpClient) {
  }

  getRecords() {
    return this.httpClient.get('http://localhost:3002/AllRecords');
  }
}
