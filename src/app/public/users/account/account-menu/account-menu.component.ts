import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent implements OnInit {
  public imagepath = '../../../../../assets/template/images/logo/logo.ico';
  constructor() { }

  ngOnInit() {
  }

}
