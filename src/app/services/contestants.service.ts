import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://192.168.1.134:3333/api';

@Injectable({
  providedIn: 'root'
})
export class ContestantsService {

  constructor(private http: HttpClient) {}

  getGlobalRanking() {
    return this.http.get(`${API_URL}/contestant`)
  }

}
