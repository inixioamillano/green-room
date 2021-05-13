import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ContestantsService } from '../../services/contestants.service';

@Component({
  selector: 'global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  contestants: any[];

  constructor(private contestantsService: ContestantsService, private router: Router) { }

  ngOnInit(): void {
    this.contestantsService.getGlobalRanking().pipe(take(1)).subscribe(
      (contestants: any[]) => {
        this.contestants = contestants;
      }
    ),
    (error) => {
      console.log(error);
      this.router.navigate(['/myvotes']);
    }
  }

}
