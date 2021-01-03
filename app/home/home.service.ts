import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {
    public languageChanged: Subject<any> = new Subject();
    public ChangeLanguageCode: Subject<any> = new Subject();

    constructor(public http: HttpClient) { }

    public getHomeData(): any {
        const provider_types_url = 'assets/data/api/provider-type.json';
        return this.http.get(provider_types_url).map((response: Response) => response['grids']);
    }
}
