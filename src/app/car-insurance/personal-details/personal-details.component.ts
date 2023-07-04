import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsuranceService } from 'src/app/core/services/insurance.service';



@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  personalDetails!:FormGroup;
  ownerDetailsForm:boolean = false;
  insuranceData:any;

  constructor(private fb:FormBuilder, private carInsService:InsuranceService){
      this.insuranceData = this.carInsService.carInsuranceModal;
      console.log(this.insuranceData)
  }

  ngOnInit() {
    this.personalDetails = this.fb.group({
      "owner-details" : this.fb.group({
        "fullName" : ['',Validators.required],
        "pinCode" : ['',Validators.required],
        "email" : ['',Validators.required],
        "mobile" : ['',Validators.required],
        "sendUpdatesViaWhatsap" : [false],
        // "address" : ['',[Validators.required]],
        "nomineeReltionship":['']
      }),
      "car-details" : this.fb.group({
        "regNumber" : ['',Validators.required],
        "chasisNumber" : ['',[Validators.required]],
        "engineNumber" : ['',[]],
        "isCarLoadTaken" : [false],
        "bankLoanProvider" : ['']
      })
    })


  }

  get fullName(){
    return this.personalDetails.get('owner-details.fullName');
  };

  get pinCode(){
    return this.personalDetails.get('owner-details.pinCode')
  }
  get email(){
    return this.personalDetails.get('owner-details.email')
  }
  get phone(){
    return this.personalDetails.get('owner-details.phone')
  }

  get chasisNumber(){
    return this.personalDetails.get('car-details.chasisNumber')
  }
  get regNumber(){
    return this.personalDetails.get('car-details.regNumber')
  }


  toggleForm(){
    this.ownerDetailsForm = true;
  }

  submitForm(){
console.log(this.personalDetails.value)
  }


}
