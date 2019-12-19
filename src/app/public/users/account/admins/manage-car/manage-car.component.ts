import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Car } from 'src/app/model/car';

@Component({
  selector: 'app-manage-car',
  templateUrl: './manage-car.component.html',
  styleUrls: ['./manage-car.component.scss']
})
export class ManageCarComponent implements OnInit {
  public cars: Car[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    })
  }

}
