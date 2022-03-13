import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { materialModules } from './material-modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { TaskListComponent } from './dashboard/task-list/task-list.component';
import { AddJobComponent } from './dashboard/add-job/add-job.component';

import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/firestore';

registerLocaleData(localeTr);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    TaskListComponent,
    AddJobComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    [...materialModules],
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'tr' },
    {
      provide: FIRESTORE_SETTINGS,
      useValue: { ignoreUndefinedProperties: true, merge: true },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
