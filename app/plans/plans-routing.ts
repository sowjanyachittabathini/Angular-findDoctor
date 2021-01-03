import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlansComponent } from './planselect/plans.component';
import { ChoosePlanComponent } from './chooseplan/choose-plan.component';

const planRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'planselect', component: PlansComponent
    },
    {
      path: 'chooseplan', component: ChoosePlanComponent
    }]
  }
];

export const PlansRouting: ModuleWithProviders = RouterModule.forChild(planRoutes);
