import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { BscErrorHandler } from '../shared/services/bsc-error-handler.service';
import { LocationComponent } from './location.component';
import { LocationRouting } from './location-routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LocationRouting,
    NgbModule
  ],
  declarations: [LocationComponent],
  providers: [BscErrorHandler]
})

export class LocationModule { }
