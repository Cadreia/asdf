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
              ) {
               
            
               }

  ngOnInit() {
    this.addtransitform = this.formBuilder.group({
      countrySelect: ['', [Validators.required]],
      stateSelect: ['', [Validators.required]],
      citySelect: ['', [Validators.required]],
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
          } else if (error.errorCode === 409) {
            if (error.code === 'TRANSIT_AND_STOP_ALREADY_IN_USE') {
              this.toaster.locationExists();
            }
          }
        }
      }
    );
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  onChangeCountry(countryValue: any) {
     this.addtransitform.controls['countrySelect'].setValue(countryValue, {
           onlySelf: true
         });
         this.states.length = 0;
         console.log(this.addtransitform.get("stateSelect"));
         this.cities.length = 0;
         this.countriesService.getStatesOfCountry(this.addtransitform.value.countrySelect.id);
         this.states = this.countriesService.selectStates;
  }

  onChangeState(stateValue: any) {
    this.addtransitform.controls['stateSelect'].setValue(stateValue, {
          onlySelf: true
        });
        this.cities.length = 0;
        this.countriesService.getCitiesOfState(this.addtransitform.value.stateSelect.id);
        this.cities = this.countriesService.selectCities;
  }
}
