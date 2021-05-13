import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(array: any[], ...args: unknown[]): any[] {
    console.log(array)
    return array.slice().reverse();
  }

}
