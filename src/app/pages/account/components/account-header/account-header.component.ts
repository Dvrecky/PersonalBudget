import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-account-header',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './account-header.component.html',
  styleUrl: './account-header.component.css'
})
export class AccountHeaderComponent {

}
