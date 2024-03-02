import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent, NoNavLayoutComponent } from '@layout';
import { AuthGuard } from '@guard';
import { LoginComponent, RegisterComponent, HomeComponent, ProfileComponent } from '@component';

const routes: Routes = [{
  path: '',
  component: DefaultLayoutComponent,
  canActivate: [AuthGuard],
  children: [
      { path: 'profile', component: ProfileComponent },
      { path: '', component: HomeComponent },
  ]
},
{
  path: '',
  component: NoNavLayoutComponent,
  children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
  ]
},

// otherwise redirect to home
{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
