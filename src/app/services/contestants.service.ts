import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContestantsService {

  constructor(private http: HttpClient) {}

  getGlobalRanking() {
    return this.http.get(`${environment.API_URL}/contestant`)
  }

}
