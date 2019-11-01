import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
public imagepath = '../../../assets/template/images/logo/logo.ico';
  constructor() { }

  ngOnInit() {
  }

}
