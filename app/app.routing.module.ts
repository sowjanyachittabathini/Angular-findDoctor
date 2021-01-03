import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from './home/home.module';
import { LocationModule } from './location/location.module';
import { PlansModule } from './plans/plans.module';
import { HomeComponent } from './home/home/home.component';

const appRoutes: Routes = [
  {
    path: 'fad',
    component: HomeComponent
  },
  {
    path: 'location',
    loadChildren: './location/location.module#LocationModule'
  },
  {
    path: 'search',
    loadChildren: './search/search.module#SearchModule'
  },
  {
    path: 'plans',
    loadChildren: './plans/plans.module#PlansModule'
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
    HomeModule
  ],
  declarations: [
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
