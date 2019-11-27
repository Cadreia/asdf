import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  getUserinfo() {

 return JSON.parse(localStorage.getItem('userDetails'));
  }
}
