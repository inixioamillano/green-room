import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient, private userService: UserService) { }

  save(votes: any[]) {
    return this.http.post(`${environment.API_URL}/vote`, {
      votes,
      userId: this.userService.getUserId()
    });
  }

  getMyVotes() {
    return this.http.get(`${environment.API_URL}/user/${this.userService.getUserId()}`).pipe(map((r: any) => {
      return {
        votes: r.user.votes.map(v => v.contestant),
        votesOpen: r.votesOpen
      }
    }))
  }

}
