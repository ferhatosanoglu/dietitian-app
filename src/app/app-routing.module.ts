import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ClientLayoutComponent,
  LoginComponent
} from './components';
import {
  HomepageComponent,
  AdminComponent,
  DiseaseComponent,
  DietComponent
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'login' }
  },
  {
    path: ':id',
    component: ClientLayoutComponent,
    children: [
      {
        path: 'patient',
        component: HomepageComponent,
        data: { title: 'Dietitian App' }
      },
      {
        path: 'disease',
        component: DiseaseComponent,
        data: { title: 'Disease' }
      },
      {
        path: 'diet',
        component: DietComponent,
        data: { title: 'Diet' }
      },
      {
        path: 'doctor',
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
