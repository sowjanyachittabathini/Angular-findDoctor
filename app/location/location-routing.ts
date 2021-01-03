import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location.component';

const locationRoutes: Routes = [
  {
    path: '', component: LocationComponent
  }
];

export const LocationRouting: ModuleWithProviders = RouterModule.forChild(locationRoutes);
