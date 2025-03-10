import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage',
  standalone: true
})
export class PercentagePipe implements PipeTransform {

  transform(value: number): string {
    if (value == null || isNaN(value)) {
      return '0%';
    }
    return `${value.toFixed(2)}%`;
  }
}
