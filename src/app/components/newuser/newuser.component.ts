import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {

  name = '';
  loading = false;
  error = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loading = false;
  }

  submit() {
    this.userService.create(this.name).pipe(take(1)).subscribe(
      (user: any) => {
        this.userService.saveUserId(user.id);
        this.router.navigate([this.userService.savedUrl || '/myvotes']);
      },
      (error: any) => this.error = true 
    );
  }

}
