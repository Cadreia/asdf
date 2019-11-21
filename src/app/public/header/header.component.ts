import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn = false;
  public userInfo: User[] = [];
public imagepath = '../../../assets/template/images/logo/logo.ico';
  constructor(private loggedIn: LoginService, private toaster: MessageService, private router: Router) { }

  ngOnInit() {
    if (this.loggedIn.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      return false;
    }
    this.loggedIn.getUserData().pipe(first()).subscribe(
      (data: any) => { this.userInfo = data; },
      error => {
        console.log('no user information found found');
        console.log(error);
      });
  }

  logout() {
    this.loggedIn.logout();
    // .subscribe(
    //   (data: any) => {

    //     this.router.navigate(['public/home']);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    this.toaster.logoutMessage();
    this.isLoggedIn = false;
  }

}
