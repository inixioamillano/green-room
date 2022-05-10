import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ContestantsService } from '../../services/contestants.service';

@Component({
  selector: 'global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit, OnDestroy {

  contestants: any[];
  firstLoad = true;
  interval: number;

  constructor(private contestantsService: ContestantsService, private router: Router) { }

  ngOnInit(): void {
    this.updateRanking();
    this.interval = window.setInterval(() => this.updateRanking(), 120000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  private updateRanking(): void {
    this.contestantsService.getGlobalRanking().pipe(take(1)).subscribe(
      (contestants: any[]) => {
        this.contestants = contestants;
        this.firstLoad = false;
      },
      (error) => {
        console.log(error);
        if (this.firstLoad) {
          this.router.navigate(['/myvotes']);
        }
      });
  }
}
