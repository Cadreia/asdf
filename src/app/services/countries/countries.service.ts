import { Injectable } from '@angular/core';
import { ICountry } from 'src/app/interface/country';
import { IState } from 'src/app/interface/state';
import { ICity } from 'src/app/interface/city';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  countries: ICountry[] = [];
  states: IState[] = [];
  cities: ICity[] = [];
  selectStates: IState[] = [];
  selectCities: ICity[] = [];

  constructor(private httpClient: HttpClient) { }

  getAllCountries() {
    return this.httpClient.get('assets/countries-data/countries.json');
  }

  getStatesOfCountry(countryId: number) {
    this.httpClient.get('assets/countries-data/states.json').subscribe((states: IState[]) => {
      this.states = states;

      for(let state of this.states) {
        for(var key in state) {
          if (key == 'country_id' && state[key] === countryId) {
            this.selectStates.push(state);
          }
        }
      }
    });
  }

  getCitiesOfState(stateId: number) {
    this.httpClient.get('assets/countries-data/cities.json').subscribe((cities: ICity[]) => {
      this.cities = cities;

      for(let city of this.cities) {
        for(var key in city) {
          if (key == 'state_id' && city[key] === stateId) {
            this.selectCities.push(city);
          }
        }
      }
    });
  }
}
