import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'votable',
  pure: false
})
export class VotablePipe implements PipeTransform {

  transform(contestants: any[], ...args: any[][]): unknown {
    const votes: any[] = args[0] || [];
    return contestants.filter(c => !votes.find(v => v && v.countryCode === c.countryCode) && !c.eliminated);
  }

}
