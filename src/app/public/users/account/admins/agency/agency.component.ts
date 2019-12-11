import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/public/shared/sharedservice/shared.service';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
isOfficialAdmin: boolean;
  constructor(private sharedSevice: SharedService) { }

  ngOnInit() {
    if (this.sharedSevice.IsAdmin()) {
      this.isOfficialAdmin = true;
    } else {
      this.isOfficialAdmin = false;
    }
  }

}
