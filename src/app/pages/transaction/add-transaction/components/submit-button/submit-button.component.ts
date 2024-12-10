import {Component, EventEmitter, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-submit-button',
  standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule
    ],
  templateUrl: './submit-button.component.html',
  styleUrl: './submit-button.component.css'
})
export class SubmitButtonComponent {
  @Output() transactionConfirmed = new EventEmitter<void>();

  onSubmit() {
    this.transactionConfirmed.emit();
  }
}
