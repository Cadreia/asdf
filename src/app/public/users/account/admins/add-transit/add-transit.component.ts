import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/messages/message.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';
import { Router } from '@angular/router';
import { ICountry } from 'src/app/interface/country';
import { IState } from 'src/app/interface/state';
import { ICity } from 'src/app/interface/city';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-add-transit',
  templateUrl: './add-transit.component.html',
  styleUrls: ['./add-transit.component.scss']
})
export class AddTransitComponent implements OnInit {
  public imagepath = '../../../../../assets/template/images/logo/logo.ico';
  public addtransitform: FormGroup;
  public userInfos: any;
  public isAdmin: boolean;
  public loader: boolean;
  public countries: ICountry[] = [];
  public states: IState[] = [];
  public cities: ICity[] = [];

  constructor(private formBuilder: FormBuilder,
    private toaster: MessageService,
    private adminService: AdminService,
    private sharedService: SharedService,
    private router: Router,
    private countriesService: CountriesService,
    private loginService: LoginService
  ) {


  }

  ngOnInit() {
    this.addtransitform = this.formBuilder.group({
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', Validators.required]
    });

    this.countriesService.getAllCountries().subscribe((countries: ICountry[]) => {
      this.countries = countries;
    });

    this.userInfos = this.sharedService.getUserinfo();
    if (this.sharedService.IsAdmin()) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
      this.router.navigate(['public/users/account/overview']);
    }
  }

  createTransitForm() {
    this.addtransitform.value.country = this.addtransitform.value.country.name;
    this.addtransitform.value.state = this.addtransitform.value.state.name;

    this.loader = true;
    console.log(this.addtransitform.value);
    this.adminService.addTransitForm(this.addtransitform.value).subscribe(
      (response: any) => {
        this.loader = false;
        console.log('success', response);
        this.router.navigate(['public/users/account/admin']);
        this.toaster.successCreateTransit();
      }, (error: any) => {
        this.loader = false;
        console.log(error);
        if (!(error && Object.keys(error).length === 0)) {
          if (error.errorCode === 0) {
            this.toaster.offlineMessage();
          }
          if (error.errorCode === 500) {
            this.toaster.internalError();
          }
          if (error.errorCode === 401) {
            if (error.code === 'ACCESS_DENIED') {
              this.toaster.accessDenied();
            }
          } else if (error.errorCode === 403) {
            this.loginService.logout();
            this.router.navigateByUrl('/public/authentication/login');
          } else if (error.errorCode === 409) {
            if (error.code === 'TRANSIT_AND_STOP_ALREADY_IN_USE') {
              this.toaster.locationExists();
            }
          }
        }
      }
    );
  }

  handleError(controlName, errorName) {
    return this.addtransitform.controls[controlName].hasError(errorName);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  onChangeCountry() {
    this.states.length, this.cities.length = 0;
    this.countriesService.getStatesOfCountry(this.addtransitform.value.country.id);
    this.states = this.countriesService.selectStates;
    this.addtransitform.controls['state'].setErrors({ 'incorrect': true });
    this.addtransitform.controls['city'].setErrors({ 'incorrect': true });
  }

  onChangeState(stateValue: any) {
    this.cities.length = 0;
    this.countriesService.getCitiesOfState(this.addtransitform.value.state.id);
    this.cities = this.countriesService.selectCities;
  }
}
