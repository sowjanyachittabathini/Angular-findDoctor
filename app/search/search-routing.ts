import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { ProfileComponent } from './profile/profile.component';

const searchRoutes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

export const SearchRouting: ModuleWithProviders = RouterModule.forChild(searchRoutes);
