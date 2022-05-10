import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faShare, faUsers } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { RoomService } from '../../services/room.service';
@Component({
  selector: 'room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  id: string;
  loading = true;
  room;
  faShare = faShare;
  faUsers = faUsers;
  navigator = window.navigator;
  interval: number;

  constructor(private route: ActivatedRoute, private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.url[1].path;
    this.getRoomDetails();
    this.interval = window.setInterval(() => this.getRoomDetails(), 60000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  private getRoomDetails() {
    this.roomService.getRoom(this.id).pipe(take(1)).subscribe(room => {
      this.room = room;
      this.loading = false;
    },
      (err) => {
        // If we failed while loading then we go back, if it was during an update it doesn't mind
        if (this.loading) {
          this.router.navigate(['/rooms']);
        }
      });
  }

  share() {
    try {
      navigator.share({
        title: 'Green Room',
        text: `Join the room ${this.room.name} and vote for your favourite #Eurovision2021 contestants`,
        url: `https://green-room-app.herokuapp.com/room/${this.room.id}`
      })
    } catch(err) {
      navigator.clipboard.writeText(`https://green-room-app.herokuapp.com/room/${this.room.id}`);
      alert('Link copied to clipboard!');
    }
  }

}
