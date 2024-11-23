import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav'; 

@Component({
  selector: 'app-size-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule],
  templateUrl: './size-nav-bar.component.html',
  styleUrls: ['./size-nav-bar.component.css']
})
export class SizeNavBarComponent {

}
