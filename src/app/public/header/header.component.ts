import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { config } from 'src/app/configs/app.config';
import { SharedService } from '../shared/sharedservice/shared.service';
import { TranslationService } from 'src/app/services/translate/translation.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public online = true;
  public userInfos: any;
public imagepath = '../../../assets/template/images/logo/logo.ico';
public acountPath = `${config.account_dir}/overview`;
  isLoggedIn: boolean;
  constructor(private loginService: LoginService,
              private toaster: MessageService,
              private router: Router,
              private shareService: SharedService,
              private TranslatinService: TranslationService
             ) { }

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
       this.isLoggedIn = false;
    }

    if (window.navigator.onLine) {
      this.online = true;
    } else {
      this.online = false;
    }

    if (localStorage.getItem('userDetails') !== '') {
    this.userInfos = this.shareService.getUserinfo();
  }

  }
  changelang(lang){
 this.TranslatinService.getTranslationMessages(lang);
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.toaster.logoutMessage();
    this.router.navigate(['public/authentication/login']);
  }

}
