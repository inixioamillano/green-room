import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  myRooms: any[];
  loading = true;

  constructor(private roomsService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.roomsService.getMyRooms().pipe(take(1)).subscribe(
      (myRooms: any[]) => {
        this.loading = false;
        this.myRooms = myRooms
      },
      (err) => {
        this.router.navigate((['/myvotes']))
      }
    )
  }

}
