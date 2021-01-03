import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment.dev1';


@Injectable()
export class SearchService {
  public show_filter_sort_options = new Subject<boolean>();
  public search_provider_data = new Subject<any>();
  public provider_details = new Subject<any>();
  public marker_data = new Subject<any>();
  public search_providers_data: any;
  public provider_marker_data: any;
  public selectedFacility: string;
  public show_additional_locations = new Subject<any>();
  public highlight_location_marker = new Subject<any[]>();
  public toogle_list_map = new Subject<boolean>();
  public http_interceptor_handler = new Subject<boolean>();

  constructor(private http: HttpClient) { }
  /**
   * method will make a API call to get the data options for filter and sort
   */
  public getFilterSortOption(): any {
    const filter_sort_url = (environment.production) ? 'assets/data/api/search-filtersort.json' : 'assets/data/api/search-filtersort.json';
    return this.http.get(filter_sort_url).map((response: Response) => response['filterData']);
  }

  public searchProviderData(service_type: string): any {
    const filter_sort_url = (environment.production) ? 'assets/data/api/searchResultList/' + service_type + '.json' : 'assets/data/api/searchResultList/' + service_type + '.json';
    return this.http.get(filter_sort_url).map((response: Response) => response['provider-list']);

  }

  public getSearchTypes(): any {
    const provider_types_url = 'assets/data/api/search-type.json';
    return this.http.get(provider_types_url).map((response: Response) => response['search-types']);
  }

  public getSearchProvidersData(): any {
    return this.search_providers_data;
  }

  public getProvidersmarkerData(): any {
    return this.provider_marker_data;
  }

  /**
   * @param providers_data
   * Push the providers data to subject after creating unique id by calling addLocationId method.
   */
  public setProviderDetails(providers_data): void {
    const location_data = this.addLocationIds(...providers_data);
    this.search_providers_data = location_data;
    this.provider_details.next(location_data);
    this.setMarkerData(...this.search_providers_data);
  }

  /**
   * To load respective Mock JSON with specialities
   */
  public getSpecialityData(service_type: string): any {
    const speciality_types_url = 'assets/data/api/searchDropdownSpecialities/' + service_type + '.json';
   // console.log("get token >>" + this.http_interceptor.auth.getToken());
    return this.http.get(speciality_types_url).map((response: Response) => response['responseBody']);
  }

  public getSaveResultsData(): any {
    const save_results_url = 'assets/data/api/saveresults.json';
    return this.http.get(save_results_url).map((response: Response) => response['save_results']);
  }

  private setMarkerData(...providers: any[]): any {
    this.provider_marker_data = this.checkSameLocationProviders(providers.slice());
    this.marker_data.next(this.provider_marker_data);
  }

  public downloadFile(service_type: string): any {
    const download_url = 'assets/data/api/' + service_type + '.json';
    console.log(download_url);
    return this.http.get(download_url).map(res => res['data']);
  }

  public sendmail(service_type: string, form: any): any {
    const sendmail_url = 'assets/data/api/' + service_type + '.json';
    console.log(sendmail_url);
    return this.http.get(sendmail_url, { params: form });
  }


  /**
   * @param locations
   * Unique ids will be added to the all the providers.
   */
  private addLocationIds(...providers: any[]): any {
    if (providers) {
      providers.map((provider, index) => {
        if (provider.address.location) {
          provider.address.location['location_id'] = 'provider_' + Math.random().toString(36).substr(2, 16);
          // this.checkSameLocationProviders(provider, providers);
          if (provider.address && provider.address.additional_address) {
            for (const addr of provider.address.additional_address) {
              addr.location['location_id'] = 'provider_add_' + Math.random().toString(36).substr(2, 16);
            }
          }
        }
      });
      return providers;
    } else {
      return null;
    }
  }

  private checkSameLocationProviders(providers: any[]): any {
    const provider_copy = Object.assign([], providers);

    providers.map((provider, index_val) => {
      provider.address['other_providers'] = [];
      for (let i = index_val + 1; i <= provider_copy.length; i++) {
        if ((provider_copy[i] !== undefined) && (provider_copy[i].address.location && provider.address.location)) {
          if ((provider_copy[i].address.location.lat === provider.address.location.lat)) {
            if ((provider_copy[i].address.location.lng === provider.address.location.lng)) {
              providers[i].address.location.location_id = provider.address.location['location_id'];
              provider.address['other_providers'].push(provider_copy[i]);
              delete provider_copy[i];
            }
          } else {
            provider.address['other_providers'] = [];
          }
        }
      }
    });
    return provider_copy;
  }
}
