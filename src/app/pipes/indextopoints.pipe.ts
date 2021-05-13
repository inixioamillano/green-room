import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indextopoints'
})
export class IndextopointsPipe implements PipeTransform {

  transform(index: number, ...args: unknown[]): number {
    if (index === 0) {
      return 12;
    }
    if (index === 1) {
      return 10;
    }
    return 10 - index;
  }

}
