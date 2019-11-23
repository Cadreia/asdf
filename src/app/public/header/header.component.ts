import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { User } from 'src/app/model/user';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn = false;
  public online = true;
  public userInfo: User[] = [];
public imagepath = '../../../assets/template/images/logo/logo.ico';
  constructor(private loginService: LoginService,
              private toaster: MessageService,
              private router: Router
             ) { }

  ngOnInit() {
    if (window.navigator.onLine) {
      this.online = true;
    } else {
      this.online = false;
    }

    if (this.loginService.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      return false;
    }

    this.loginService
      .getUserData()
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.userInfo = data;
        },
        error => {
          console.log('no user information found found');
          console.log(error);
        }
      );

  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.toaster.logoutMessage();
    this.router.navigate(['public/authentication/login']);
  }

}
