import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PlanSelectService {

  public clear_plans_subject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  /**
   * This method retrieves the available Primary and
   * Secondary Plans.
   */
  public getPlansData() {
    console.log('Inside Plans service. Getting the Plans from the assests.');
    const provider_types_url = 'assets/data/api/plan-select.json';
    return this.http.get(provider_types_url).map((response: Response) => response['plan']);
  }
}
