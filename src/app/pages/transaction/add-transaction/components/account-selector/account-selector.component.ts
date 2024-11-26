import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-account-selector',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule],
  templateUrl: './account-selector.component.html',
  styleUrl: './account-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSelectorComponent{

}
