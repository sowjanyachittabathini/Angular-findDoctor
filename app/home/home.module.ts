import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { BscErrorHandler } from '../shared/services/bsc-error-handler.service';
import { HomeService } from './home.service';
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { HomeProperties } from './home.properties';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [HomeComponent, HelpComponent],
  providers: [HomeProperties, BscErrorHandler, HomeService],
  exports: [HomeComponent]
})

export class HomeModule { }
