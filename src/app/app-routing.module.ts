import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/user', 
        pathMatch: 'full'
      },
      {
        path: 'user',
        component: UserDashboardComponent,
      },
      {
        path: 'admin',
        component: AdminDashboardComponent
      }
    ],
  },
  { path: '', redirectTo: '/home/user', pathMatch: 'full' },
  { path: '*', component: LayoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
