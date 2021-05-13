import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  getUserId() {
    return localStorage.getItem('green-room-user-id');
  }

  saveUserId(id: string) {
    return localStorage.setItem('green-room-user-id', id);
  }

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return localStorage.getItem('green-room-user-id') !== null;
  }

  create(username: string) {
    return this.http.post(`${environment.API_URL}/user`, {username});
  }

}
