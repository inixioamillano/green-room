import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  savedUrl: string;

  getUserId() {
    return localStorage.getItem('green-room-user-id');
  }

  saveUserId(id: string) {
    return localStorage.setItem('green-room-user-id', id);
  }

  constructor(private http: HttpClient, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationCancel) {
        // Saving URL from canceled route.
        this.savedUrl = event.url;
      } else if (event instanceof NavigationEnd) {
        // If user navigates away from sign-in page, clearing saved URL.
        if (!event.url.match(/^\/newuser/)) {
          this.savedUrl = null;
        }
      }
    });
  }

  isLoggedIn() {
    return localStorage.getItem('green-room-user-id') !== null;
  }

  create(username: string) {
    return this.http.post(`${environment.API_URL}/user`, {username});
  }

}
