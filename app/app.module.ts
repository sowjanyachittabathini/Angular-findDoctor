import { NgModule, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing.module';
import { BscErrorHandler } from './shared/services/bsc-error-handler.service';
import { BscLoggerService } from './shared/services/bsc-logger.service';
import { PlanSelectService } from './plans/planselect.service';
import { SearchService } from './search/search.service';
import { BscGoogleApiLoader } from './shared/services/bsc-google-api.service';
import { AppComponent } from './app.component';
import { BscSearchDeatailsReducer } from './shared/state-management/bsc-search-details.reducer';
import { BscLangTranslateService } from './shared/localization/bsc-lang-translate.service';
import { BscWcmService } from './shared/services/bsc-wcm.service';
import { BscTokenInterceptor } from './shared/services/bsc-interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({ search: BscSearchDeatailsReducer })
  ],
  providers: [
    { provide: ErrorHandler, useClass: BscErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: BscTokenInterceptor, multi: true },
    BscLoggerService,
    PlanSelectService,
    SearchService,
    BscLangTranslateService,
    BscWcmService
  ],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(bscGoogleApiLoader: BscGoogleApiLoader) { }
  static forRoot(): AppModule {
    return {
      providers: [PlanSelectService, SearchService, BscLangTranslateService, BscWcmService, BscTokenInterceptor]
    };
  }
}
