import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadPageComponent } from './upload-page/upload-page.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';
// Import angular-cropperjs
import { AngularCropperjsModule } from 'angular-cropperjs';
import { MatFormFieldModule, MatMenuModule,MatInputModule,MatFormFieldControl, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    UploadPageComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
        // Load angular-cropperjs
        AngularCropperjsModule,
    AppRoutingModule,MatSelectModule,
    BrowserAnimationsModule,FormsModule,
    MatChipsModule,
    MatStepperModule,
    MatFormFieldModule,MatMenuModule,MatSnackBarModule,HttpClientModule,
    MatInputModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
