import { Component } from '@angular/core';
import { LeftColumnComponent } from "../components/left-column/left-column.component";
import { RightColumnComponent } from "../components/right-column/right-column.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LeftColumnComponent, RightColumnComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
