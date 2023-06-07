import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

import { TableComponent } from './table/table.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { FixturesComponent } from './fixtures/fixtures.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { FilterTeamPipe } from './filter-team.pipe';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    
    TableComponent,
    FixturesComponent,
    FilterTeamPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
   BrowserAnimationsModule,
   MatInputModule,
   MatFormFieldModule,
   MatButtonModule,
   MatIconModule,
   MatToolbarModule,
   MatMenuModule,
   MatDialogModule,
   MatTableModule,
   MatSortModule,
   MatSelectModule,
   FormsModule,
   
   provideFirebaseApp(() => initializeApp(environment.firebase)),
   provideAuth(() => getAuth()),
   provideDatabase(() => getDatabase())

    
    
  ],
  providers: [FilterTeamPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
