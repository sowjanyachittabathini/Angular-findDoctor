import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { BscErrorHandler } from '../shared/services/bsc-error-handler.service';
import { SearchComponent } from './search.component';
import { FilterSortComponent } from './filtersort/filtersort.component';
import { ResultListComponent } from './resultlist/resultlist.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchRouting } from './search-routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SearchRouting,
    NgbModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SearchComponent,
    FilterSortComponent,
    ResultListComponent,
    ProfileComponent
  ],
  providers: [BscErrorHandler]
})

export class SearchModule { }
