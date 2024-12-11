import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pln',
  standalone: true
})
export class PlnPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (value == null) {
      return '';
    }
    return `${value.toFixed(2).replace('.', ',')} zł`;
  }
}
