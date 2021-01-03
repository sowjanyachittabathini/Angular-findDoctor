import {
  Component, OnInit, OnDestroy, ViewEncapsulation, EventEmitter, ViewChild, ElementRef, HostListener,
  ChangeDetectorRef
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BscErrorHandler } from '../shared/services/bsc-error-handler.service';
import { SearchService } from './search.service';
import { environment } from '../../environments/environment.dev1';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnInit, OnDestroy {
  public showSearchContent = true;
  public searchData: any;
  public searchDataStore: Subscription;
  public providerType: string;
  public searchTypeObj: any;
  public provider_title: string;
  public options: any;
  public choosePlan = 'choosePlan';
  public showhideboxes = false;
  public placeholder_textfield: string;
  public SelectPlanButton = true;
  public searchResultError = true;
  public absoluteURLs: any;
  public selectSubPlanName = 'Select a Plan';
  public searchResultsFilterMap = false;
  public loading_image = false;
  public search_results: any;
  public location: string;
  public specialityDropdown: string;
  public isSearchValid = false;
  public continueSearch = false;
  public showSearchErrMsg = false;
  public specialityObj: any;
  public search_name: string;
  public selected_plan_id: string;
  public rxjsSubscriptions: Subscription;
  public isvalid_location = true;
  public storeData: any;

  public openModal: any;

  @ViewChild('affix_el') affix_elem: ElementRef;
  @ViewChild('searchBtn_ele') searchBtnRef: ElementRef;

  constructor(private store: Store<any>,
    private http: HttpClient,
    private modalService: NgbModal,
    private bscSearchService: SearchService,
    private bscErrorHandler: BscErrorHandler,
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  /**
   * On component initilization making a local api call to get type of search options
   * On Success call back of api, will set the title and option based on provider type getting from the store.
   * On error will make a call to do a respective action.
   */
  public ngOnInit() {
    this.absoluteURLs = environment;
    this.bscSearchService.getSearchTypes().subscribe((response) => {
      this.searchTypeObj = response[0];
      this.createSearchOptions(this.providerType);
    },
      error => this.handleError(error));

    this.searchDataStore = this.store.select('search').subscribe(data => {
      this.providerType = data.searchtype || 'doctors';
      this.location = data.location || 'Fremont, California, United States, San Jose, California, United States';
      this.storeData = data;
    });

    this.bscSearchService.search_provider_data.subscribe((data) => {
      let location_coordinates, valid_location;
      [location_coordinates, valid_location] = data;
      this.location = location_coordinates[0].loc_name;
      this.isvalid_location = valid_location;
      this.searchCriteria();
    });

    const selected_plans = this.getPlans();
    if (selected_plans) {
      if (selected_plans.secondaryPlan.secondaryPlanId !== null) {
        this.selectSubPlanName = selected_plans.secondaryPlan.secondaryPlanName;
      } else {
        this.selectSubPlanName = selected_plans.primaryPlan.primaryPlanName;
      }
    }

    /**
     * What ever the specialities related to search page according to the provider
     * selected in homepage, will be subscribed and stored on load of search page.
     * This will not apply to Pharmacy provider type alone.
    */
    if (this.providerType !== 'pharmacies') {
      this.bscSearchService.getSpecialityData(this.providerType).subscribe((response) => {
        this.specialityObj = response['specialtyGroups'];
      },
        error => this.handleError(error));
    } else {
      this.specialityObj = false;
      this.showhideboxes = true;
    }
  }
  public getPlans(): any {
    const selectedPlanObject = this.storeData.selectedPlan;

    if (selectedPlanObject) {
      if (this.providerType === 'dentists') {
        return selectedPlanObject.selectedDentalPlan;
      } else if (this.providerType === 'vision_care') {
        return selectedPlanObject.selectedVisionPlan;
      } else {
        return selectedPlanObject.selectedMedicalPlan;
      }
    }
  }
  public selectPlan(content): void {
    this.openModal = this.modalService.open(content);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    if (this.openModal) {
      this.openModal.close();
    }
  }

  /**
   * @param value
   * this function triggers whenever radio Component emits placeholder value via Output.
   */
  public handleOutput(changed_data: any[]): void {
    this.placeholder_textfield = changed_data[0];
    if (changed_data[1]) {
      this.showhideboxes = true;
    } else {
      this.showhideboxes = false;
    }
  }

  /**
   * On Click of search button, Method will be making an API call to get the provider/speciality details.
   * On success response pushing new data to the RXJS Subject to populate details.
   * On API failure pushing a null object.
   * Search facility will happen only when proper speciality details is entered.
   */
  public searchCriteria(): void {
    if (this.isvalid_location) {
      if (this.showhideboxes && this.specialityObj !== null) {  // For search by Name
        this.specialityObj[0]['specialtydisplay'].forEach(element => {
          if (this.specialityDropdown.toLowerCase() === element['specialtyDisplayName'].toLowerCase()) {
            this.continueSearch = true;
            return;
          }
        });
      }
      if (this.continueSearch) {
        this.loading_image = !this.loading_image;
        this.bscSearchService.searchProviderData(this.providerType).subscribe((provider_details: any) => {
          this.searchResultsFilterMap = true;
          this.bscSearchService.setProviderDetails(provider_details);
          this.search_results = provider_details.length;
          this.loading_image = !this.loading_image;
          // this.changeDetectorRef.detectChanges();
        }, err => this.bscSearchService.setProviderDetails(null));
        this.showSearchErrMsg = false;
        this.continueSearch = false;
      } else {
        this.search_results = 0;
        this.searchResultsFilterMap = true;
        this.bscSearchService.setProviderDetails(null);
        this.showSearchErrMsg = true;
      }
      this.search_name = this.specialityDropdown;
    } else {
      this.bscSearchService.setProviderDetails(null);
      // this.changeDetectorRef.detectChanges();
    }
  }

  /**
   * @param arg dropdown value null/has some value
   * This method is defined for event capturing from dropdown component,
   * whenever an user select or deselet specialities.
   */
  public enableSearchBtn(arg: boolean) {
    this.isSearchValid = arg;
    this.continueSearch = arg; // For search by type - enable/disable
  }

  /**
   * Window level scroll event handler for Sort & Filter band to be fixed at top position of window.
   */
  @HostListener('window:scroll', [])
  public onWindowScroll() {
    const windowScroll = document.body.scrollTop;
    if (this.searchResultsFilterMap === true) {
      if (windowScroll > 360) {
        this.affix_elem.nativeElement.classList.add('search-header-result');
      } else {
        this.affix_elem.nativeElement.classList.remove('search-header-result');
      }
    }
  }

  /**
  * When an user enters in service search field,
  * below keyup event/method will be triggered, to enable or disable search button.
  */
  public searchBoxChange(evt): void {
    this.isSearchValid = (evt.target.value) ? true : false;
  }

  /**
  * When an user searches in service search page, on successful search completion
  * below method will enable or disable Sort&Filter option bar.
  */
  public showFilterSortOptions(): void {
    this.bscSearchService.show_filter_sort_options.next(true);
  }

  /**
  * On component destroy unsubscribe the RXJS subscriptions.
  */
  public ngOnDestroy(): void {
    // this.searchDataStore.unsubscribe();
  }

  /**
   * @param error error object
   * Method will call the global error handler to show appropriate message from the error object.
   */
  private handleError(error: Error): void {
    this.bscErrorHandler.handleError(error);
  }

  /**
   * @param type provider type
   * Method will binds the title value and options of provider type search,
   * based on the finding the provider type as a key from the searchTypeObj.
   */
  private createSearchOptions(type: string): void {
    this.provider_title = this.searchTypeObj[type].title;
    this.options = this.searchTypeObj[type].options;
    if (this.options === undefined) {
      this.placeholder_textfield = this.searchTypeObj[type].placeholder;
    }
    if (this.provider_title === 'Search Pharmacies') {
      this.SelectPlanButton = false;
    }
  }
}
