import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SizeNavBarComponent } from "./components/side-nav-bar/size-nav-bar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SizeNavBarComponent, MatSidenavModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PersonalBudget';
}
