import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TableComponent } from './table/table.component';
import {canActivate,redirectLoggedInTo,redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { FixturesComponent } from './fixtures/fixtures.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']); //define using arrow function
const redirectLoggedInTotable = () => redirectLoggedInTo(['table']);


const routes: Routes = [
  {path:'',pathMatch:'full',component:LoginComponent},
  { path: 'login', component: LoginComponent, ...canActivate (redirectLoggedInTotable),  children: [
    { path: 'table', component: TableComponent }
  ]},
  {path:'signup',component:SignupComponent,...canActivate (redirectLoggedInTotable)},
  {path:'table',component:TableComponent, ...canActivate(redirectUnauthorizedToLogin),},
  {path:'fixtures', component:FixturesComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
