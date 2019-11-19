import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn = false;
  public userInfo: any;
public imagepath = '../../../assets/template/images/logo/logo.ico';
  constructor(private loggedIn: LoginService, private toaster: MessageService, private router: Router) { }

  ngOnInit() {
    if (this.loggedIn.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      return false;
    }
    this.loggedIn.getUserData().subscribe(
      (data: any) => { this.userInfo = data; },
      error => {
        console.log('no data found');
      });
  }

  logout() {
    this.loggedIn.logout().subscribe(
      (data: any) => {
        this.toaster.logoutMessage();
        this.router.navigate(['public/authentication/login']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
