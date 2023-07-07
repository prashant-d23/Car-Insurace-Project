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
  searchTerm:string = '';
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

  toggleDropdowns(){
    this.regForm.enabled ? this.regForm.disable() : this.regForm.enable();
    if(this.regForm.disabled){
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString();
      const month = this.getMonthName(currentDate.getMonth());
      this.regForm.get('year')?.patchValue(year)
      this.regForm.get('month')?.patchValue(month);
      this.insuranceData.registrationDetails.year = year;
      this.insuranceData.registrationDetails.month = month;
    }else{
      this.regForm.reset();
    }
  }

  getMonthName(month:any){
    return this.months[month];
  }

  sendCity(city:any){
    console.log(city);
    this.insuranceData.registrationDetails.city = city;
  }
}
