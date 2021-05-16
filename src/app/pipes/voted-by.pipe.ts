import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'votedBy'
})
export class VotedByPipe implements PipeTransform {

  transform(contestant, ...args: any[][]): string {
    const users: any[] = args[0];
    console.log(users);
    return 'Voted by ' + users.slice(0, 2).map(u => u.username).join(', ') + (users.length > 2 ? ` and ${users.length - 2} more` : '');
  }

}
