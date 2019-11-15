import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title = 'GoWaka-home';
   isloggedIn = false;

  searchBus = new FormGroup({
    departing: new FormControl('', Validators.required),
    arriving: new FormControl('', Validators.required),
    departingTime: new FormControl('', Validators.required)
  });
  searchTrain = new FormGroup({
    from_destination: new FormControl('', Validators.required),
    to_destination: new FormControl('', Validators.required),
    depart_times: new FormControl('', Validators.required)
  });
  constructor() {}

  ngOnInit() {}
  onSubmit() {
    console.warn(this.searchBus.value);
  }
  onSubmitTrain() {
    console.warn(this.searchTrain.value);
  }
}
