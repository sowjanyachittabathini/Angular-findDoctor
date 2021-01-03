import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BscErrorHandler } from '../shared/services/bsc-error-handler.service';
import { PlansComponent } from './planselect/plans.component';
import { PlansRouting } from './plans-routing';
import { PlanProperties } from './plan.properties';
import { ChoosePlanComponent } from './chooseplan/choose-plan.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlansRouting,
    NgbModule,
    FormsModule
  ],
  declarations: [PlansComponent, ChoosePlanComponent],
  providers: [BscErrorHandler, PlanProperties],
  exports: [PlansComponent]
})

export class PlansModule { }
