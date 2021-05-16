import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByPoints'
})
export class OrderByPointsPipe implements PipeTransform {

  transform(contestants: any[], ...args: unknown[]): unknown {
    console.log(contestants)
    return contestants.filter(c => !c.eliminated).sort((c1, c2) => c1.votes > c2.votes ? -1 : 1);
  }

}
