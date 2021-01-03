import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, ChangeDetectorRef, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { BscGoogleMapsService } from '../shared/components/google/bsc-google-autocomplete.service';
import { BscErrorHandler } from '../shared/services/bsc-error-handler.service';
import { BscModalComponent } from '../shared/components/modal/bsc-modal.component';
import { environment } from '../../environments/environment.dev1';
import { BscGoogleAutoCompleteComponent } from '../shared/components/google/google-autocomplete/bsc-google-autocomplete.component';

declare const google: any;
declare const navigator: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LocationComponent implements OnInit, OnDestroy {
  public showPlan = false;
  public showSearch = true;
  public googleGeocoder: any;
  public latlng: any;
  public location_address: any;
  public invalidInput = false;
  public invalidLocationMsg = false;
  public locationValid = false;
  public locationSelected = false;
  public invalidState = false;
  public isValidCountry = true;
  public isNoMatch = false;
  public searchDataStore: Subscription;
  public provider_type: string;
  public networkErrMsg = false;
  public isCAState: boolean;
  public absoluteURLs: any;
  public mes_vision_link = false;
  public outside_us_healthcare = false;
  public outside_us_visioncare = false;
  public storeData: any;

  @ViewChild(BscModalComponent) modal: BscModalComponent;
  @ViewChild(BscGoogleAutoCompleteComponent) auto_complete_component: BscGoogleAutoCompleteComponent;

  constructor(private modalService: NgbModal,
    private router: Router,
    private bscGoogleMapsService: BscGoogleMapsService,
    private store: Store<any>,
    private bscErrorHandler: BscErrorHandler,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  /**
   * On component Initilization subscribe to the search store to get the selection values.
   * Any value is avilable will set to the local object for the future reference when user selects the location,
   * to save the latitiude and langitiude with provider type value
   */
  public ngOnInit() {
    this.searchDataStore = this.store.select('search').subscribe(
      data => {
        if (data.searchtype) {
          this.provider_type = data.searchtype;
          this.storeData = data;
        }
      },
      error => this.handleError(error));
    this.absoluteURLs = environment;
    window.scrollTo(0, 0);
  }

  /**
   * Method will be called when set current location is clicked.
   * Using Navigatior Api get the current position of latitiude and longitiude.
   * On success getLocationAddress method will be called to extract the pincode from the response object.
   */
  public setCurrentLocation(): void {
    const geo_options = {
      enableHighAccuracy: false,
      maximumAge: 50000
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latlng = {
          lat:  position.coords.latitude,
          lng:  position.coords.longitude
        };
        // console.log(this.latlng);
        this.getLocationAddress(this.latlng);
      }, (error) => {
        console.log('error');
      }, geo_options);
    }
  }

  /**
   * @param latlng present latitude and longitude coordinates
   * This method will make a google api call to get the results of current location.
   * From the results, the first object of the response will be passed to displayLocationAddress()
   */
  public getLocationAddress(latlng: any): void {
    this.googleGeocoder = new google.maps.Geocoder;
    this.googleGeocoder.geocode({ 'location': latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.location_address = results[0].formatted_address;
          this.displayLocationAddress(...results[0].address_components);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  /**
   * @param address
   * Method will iterate the address object to get the postal_code key
  */
  public displayLocationAddress(...address) {
    if (address.length) {
      for (const addr of address) {
        if (addr.types.indexOf('premise') !== -1 || addr.types.indexOf('locality') !== -1 || addr.types.indexOf('administrative_area_level_1') !== -1) {
          // this.location_address += addr.long_name + '  ';
        }
      }
      this.setLocationAddress(this.location_address);
      this.checkLocationIsValid(...address);
    }
  }

  /**
   * @param value current Pincode
   * Method will push the value to the checklocation subject which is defined in the service.
   * Once new value will be pushed the autocomplete component will recieves the value and set to input value.
   */
  public setLocationAddress(value: any): void {
    this.auto_complete_component.locationInputModel = value;
  }

  /**
   * @param content
   * On click Continue, if location is not valid
   * Will push new value to subject define in the service,
   * then it will make google api call to get list of cities or zipcodes.
   * If location is valid,
   * On click continue modal will be shown to continue next step
   */
  public navigateToNextPage(content): void {
    let rout_url;
    if (this.provider_type) {
      switch (this.provider_type) {
        case 'mental_health': rout_url = 'planselect'; break;
        case 'alternative_medicine': rout_url = 'planselect'; break;
        case 'pharmacies': rout_url = 'search'; break;
        default: this.router.navigate(['plans/chooseplan']); return;
      }
      this.router.navigate([rout_url]);
    } else {
      this.router.navigate(['plans/chooseplan']);
    }
  }

  /**
   * @param event
   * Method will be emitted by autocomplete component,
   * to display apporopriate message when something is wrong with location search criteria
   */
  public selectedLocation(locSelected): void {
    if (locSelected[0] === 'error') {
      this.showErrorMessage(locSelected[1]);
      return;
    }
    let latlang: any, locationStatus: any[];
    [latlang, locationStatus] = locSelected;
    this.saveLocationDetails(latlang);
    this.isCAState = locationStatus[0];
    this.handleLocationErrors(this.isCAState);
    this.changeDetectorRef.detectChanges();
  }

  public saveLocationDetails(latlang: any): any {
    this.store.dispatch({
      type: 'location_selected',
      searchtype: this.provider_type,
      latlng: latlang || this.latlng,
      location: latlang.location || this.location_address,
      selectedPlan: (this.storeData) ? this.storeData.selectedPlan : null
    });
  }

  public ngOnDestroy() {
    this.searchDataStore.unsubscribe();
  }

  /**
   * @param error error object
   * Method will call the global error handler to show appropriate message from the error object.
   */
  private handleError(error: Error): void {
    this.bscErrorHandler.handleError(error);
  }

  /**
     * @param addresses Object
     * Method will checks the selected location value is belogs to US or CA.
     */
  private checkLocationIsValid(...addresses: any[]): void {
    if (addresses.length) {
      for (const address of addresses) {
        if (address.types.indexOf('country') !== -1) {
          if (address.short_name !== 'US') {
            this.isValidCountry = false;
          } else {
            this.isValidCountry = true;
          }
        }
        if (address.types.indexOf('administrative_area_level_1') !== -1) {
          if (address.short_name !== 'CA') {
            this.isCAState = false;
          } else {
            this.isCAState = true;
          }
        }
      }
      this.selectedLocation([this.latlng, [this.isValidCountry, this.isCAState]]);
    }
  }

  /**
   * @param btnEnable boolean value to enable or disable
   * Hides all the error messages dispalyed in location template and
   * enables or disabled continue button.
   */
  private handleLocationErrors(state: boolean): void {
    this.hideErrorMsgs();
    if (this.provider_type !== 'pharmacies') {
      if (!state) {
        this.locationSelected = false;
        this.mes_vision_link = (this.provider_type === 'vision_care') ? true : false;
        switch (this.provider_type) {
          case 'vision_care': this.outside_us_visioncare = true; break;
          default: this.outside_us_healthcare = true;
        }
      } else {
        this.locationSelected = true;
      }
      return;
    }
    this.locationSelected = true;
  }

  /**
   * @param status Error Status
   * Based on error status shows the respective messages on location template.
   */
  private showErrorMessage(status: any): void {
    this.locationSelected = false;
    this.hideErrorMsgs();
    switch (status) {
      case 'ZERO_RESULTS': this.isNoMatch = true; break;
      case 'ERROR': this.networkErrMsg = true; break;
      default:
    }
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Method hides all the error messages displayed in location template.
   */
  private hideErrorMsgs(): void {
    this.invalidLocationMsg = false;
    this.invalidState = false;
    this.isNoMatch = false;
    this.networkErrMsg = false;
    this.mes_vision_link = false;
    this.outside_us_healthcare = false;
    this.outside_us_visioncare = false;
  }
}
