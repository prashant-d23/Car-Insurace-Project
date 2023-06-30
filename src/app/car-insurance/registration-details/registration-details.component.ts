import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { InsuranceService } from 'src/app/core/services/insurance.service';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss']
})
export class RegistrationDetailsComponent implements OnInit {

  insuranceData:any;
  constructor(private carInsService:InsuranceService, private http:HttpService){
    this.insuranceData = this.carInsService.carInsuranceModal;
  }

  ngOnInit(){

  }
}
