import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from './services/messages/message.service';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gowaka-test';
  constructor(private toaster: MessageService, private checkOnline: LoginService) {}

 // tslint:disable-next-line: use-lifecycle-interface
 ngOnInit() {
  this.checkOnline.login(null).subscribe(
    data => {}, error => {if (error.errorCode === 0) {this.toaster.offlineMessage();
    }
  }
  );
 }

}
