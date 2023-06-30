import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { InsuranceService } from 'src/app/core/services/insurance.service';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss']
})
export class RegistrationDetailsComponent implements OnInit {

  insuranceData:any;
  selectedYear:number | null = null;
  selectedMonth:string | null = null;
  years:number[] = [];
  months:string[] = [
    'January' , 'February' , 'March' , 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  popularCities:string[] = [
    "New Delhi", "Gurgaon", "Bangalore", "Hydrabad", "Mumbai", "Pune", "Kolkata", "Ahmedabad", "Chennai", "Kochi"
  ]

  regForm!:FormGroup;
  isVisible:boolean = false;
  constructor(private carInsService:InsuranceService, private http:HttpService, private fb:FormBuilder){
    this.insuranceData = this.carInsService.carInsuranceModal;
  }


  ngOnInit(){
    const currentYear = new Date().getFullYear();
    for(let i = 0; i < 30; i++){
      this.years.push(currentYear - i);
    }

    this.regForm = this.fb.group({
      "year" : [''],
      "month" : ['']
    })
  }
  toggleform(){
    this.isVisible = true;
  }
}
