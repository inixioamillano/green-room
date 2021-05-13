import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getMyRooms() {
    return this.http.get(`${environment.API_URL}/room/myrooms/${this.userService.getUserId()}`);
  }

  getRoom(roomId) {
    return this.http.get(`${environment.API_URL}/room/${roomId}?userId=${this.userService.getUserId()}`);
  }

  create(name: string) {
    return this.http.post(`${environment.API_URL}/room/create`, {
      name,
      userId: this.userService.getUserId()
    })
  }
}
