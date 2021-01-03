import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { WindowObjRef } from './services/global-object.service';
import { BscGoogleMapsService } from './components/google/bsc-google-autocomplete.service';
import { EventService } from './services/event.service';
import { BscPaginationService } from './components/pagination/bsc-pagination.service';
import { BscGoogleApiLoader } from './services/bsc-google-api.service';
import { BscSvgIconComponent } from './components/svg-icon/bsc-svg-icon.component';
import { BscFooterComponent } from './components/footer/bsc-footer.component';
import { BscModalComponent } from './components/modal/bsc-modal.component';
import { BscAlertComponent } from './components/alerts/bsc-alert.component';
import { BscRadioButtonComponent } from './components/radio-buttons/bsc-radio-button.component';
import { BscCheckboxComponent } from './components/checkbox/bsc-checkbox.component';
import { BscMobileComponent } from './components/header/mobile/bsc-mobile.component';
import { BscDesktopComponent } from './components/header/desktop/bsc-desktop.component';
import { BscHeaderComponent } from './components/header/header/bsc-header.component';
import { BscGoogleAutoCompleteComponent } from './components/google/google-autocomplete/bsc-google-autocomplete.component';
import { BscPaginationComponent } from './components/pagination/bsc-pagination.component';
import { BscGoogleMapComponent } from './components/google/google-map/bsc-google-map.component';
import { BscRatingsComponent } from './components/ratings/bsc-ratings.component';
import { BscDropdownComponent } from './components/dropdown/bsc-dropdown.component';
import { SharedProperties } from './shared.properties';
import { EventNames } from './services/event-names.enum';
import { BscAuthenticationService } from './services/bsc-authentication.service';
import { BscLangPipe } from './localization/bsc-lang.pipe';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    WindowObjRef,
    BscGoogleApiLoader,
    BscGoogleMapsService,
    SharedProperties,
    EventService,
    EventNames,
    BscPaginationService,
    BscAuthenticationService
  ],
  declarations: [
    BscSvgIconComponent,
    BscFooterComponent,
    BscHeaderComponent,
    BscDesktopComponent,
    BscMobileComponent,
    BscModalComponent,
    BscAlertComponent,
    BscRadioButtonComponent,
    BscCheckboxComponent,
    BscGoogleAutoCompleteComponent,
    BscGoogleMapComponent,
    BscPaginationComponent,
    BscRatingsComponent,
    BscDropdownComponent,
    BscLangPipe
  ],
  exports: [
    BscSvgIconComponent,
    BscFooterComponent,
    BscHeaderComponent,
    BscModalComponent,
    BscGoogleAutoCompleteComponent,
    BscRadioButtonComponent,
    BscGoogleMapComponent,
    BscPaginationComponent,
    BscRatingsComponent,
    BscDropdownComponent,
    BscLangPipe
  ],
  entryComponents: [BscModalComponent]
})

export class SharedModule { }
