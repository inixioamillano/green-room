import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'newroom',
  templateUrl: './newroom.component.html',
  styleUrls: ['./newroom.component.scss']
})
export class NewroomComponent implements OnInit {
  
  name = '';
  loading = false;
  error = false;

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.loading = false;
  }

  submit() {
    this.roomService.create(this.name).pipe(take(1)).subscribe(
      (room: any) => {
        this.router.navigate(['/room', room.id]);
      },
      (error: any) => this.error = true 
    );
  }
}
