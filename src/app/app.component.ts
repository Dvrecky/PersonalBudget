import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SizeNavBarComponent } from "./components/side-nav-bar/size-nav-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SizeNavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PersonalBudget';
}
