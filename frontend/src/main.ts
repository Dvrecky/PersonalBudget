import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';


/* Import Angular Material */
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { PercentagePipe } from './app/pipes/percentage.pipe';
import {ReactiveFormsModule} from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      MatSidenavModule,
      MatToolbarModule,
      MatListModule,
      MatFormFieldModule,
      MatIconModule,
      MatButtonModule,
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatSelectModule,
      HttpClientModule,
      MatDialogModule,
      PercentagePipe,
    )
  ]
})
  .catch((err) => console.error(err));
