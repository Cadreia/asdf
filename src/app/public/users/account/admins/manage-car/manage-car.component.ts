import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Car } from 'src/app/model/car';
import { MessageService } from 'src/app/services/messages/message.service';

@Component({
  selector: 'app-manage-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.scss']
})
export class ManageCarComponent implements OnInit {
  public cars: Car[];
  loading: boolean;

  constructor(
    private adminService: AdminService,
    private toaster: MessageService
    ) { }

  ngOnInit() {
    this.getAgencyBuses();
  }


  getAgencyBuses() {
    this.adminService.getAgencyBuses().subscribe((cars: Car[]) => {
      this.loading = false;
      this.cars = cars;
      console.log(this.cars);
    }, error => {
      this.loading = false;
      console.log(error);
      if (!(error && Object.keys(error).length === 0)) {
        if (error.errorCode === 0) {
          this.toaster.offlineMessage();
        }
        if (error.errorCode === 500) {
          this.toaster.internalError();
        } else if (error.errorCode === 403) {
          this.toaster.unAuthorized();
        } else if (error.errorCode === 422) {
          if (error.code === 'RESOURCE_NOT_FOUND') {
            this.toaster.unAuthorized();
          }
        }
      }
    });
  }
}
