import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  @Input()
  contestants: any[];

  @Input()
  users: any[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.users);
  }

}
