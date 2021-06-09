import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ClientLayoutComponent
} from './components/layouts';
import {
  HomepageComponent,
  AdminComponent
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
        data: { title: 'Dietitian App' }
      }
    ]
  },
  {
    path: "admin",
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: AdminComponent,
        data: { title: 'Admin' }
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [ClientLayoutComponent];
