import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateOnly'
})
export class DateOnlyPipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): unknown {
    if(value.length >= 10)
      return value.substring(0, 10);
    
    return value;
  }

}
