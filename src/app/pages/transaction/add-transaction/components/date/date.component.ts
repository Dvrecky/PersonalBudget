import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NativeDateAdapter, MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  providers: [NativeDateAdapter],
  templateUrl: './date.component.html',
  styleUrl: './date.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateComponent {

  @Output() dateChange = new EventEmitter<Date>();

  onDateChange(date: Date) {
    this.dateChange.emit(date);
  }
}
