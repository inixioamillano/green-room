import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'euroboard-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private userService: UserService) {}

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

}
