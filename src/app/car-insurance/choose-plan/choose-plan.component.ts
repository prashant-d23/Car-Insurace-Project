import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { InsuranceService } from 'src/app/core/services/insurance.service';

@Component({
  selector: 'app-choose-plan',
  templateUrl: './choose-plan.component.html',
  styleUrls: ['./choose-plan.component.scss']
})
export class ChoosePlanComponent implements OnInit {

  insuranceData:any
  planInfo:any;
  selectedPlan:any;
  addOnCoverageList:any = [];
  minimumVal:any;
  maximumVal:any;
  constructor(private http:HttpService, private router:Router, private carInsService:InsuranceService){
  this.insuranceData = this.carInsService.carInsuranceModal;

  }

  ngOnInit(){
    this.getEligiblePlan();

    this.http.getDataFromServer("get-eligible-plan").subscribe((val:any)=>{
      if(val.vehicle?.vehicleIDV){
        console.log("range " , val)
        this.minimumVal = val.vehicle.vehicleIDV.minimumVal;
        this.maximumVal = val.vehicle.vehicleIDV.maximumVal;
        console.log(this.minimumVal,this.maximumVal)
      }
    })
  }

  getEligiblePlan(){
    this.http.getDataFromServer('get-eligible-plan').subscribe((data:any)=>{
      if(data instanceof Object){
        this.planInfo = data;
        this.selectedPlan = data.plans[0].planName;
        this.setPlan(this.selectedPlan)
      }
      console.log("eligible Plan ",data)
    })
  }

  setPlan(plan:string){
    this.selectedPlan = plan ;

    let selectedPlanInfo = this.planInfo.plans.filter((el:any)=> el.planName == plan)[0];
     if(selectedPlanInfo && selectedPlanInfo.contract != null && selectedPlanInfo.contract.coverages.length > 0){
       this.addOnCoverageList = selectedPlanInfo.contract.coverages.filter((obj:any)=> obj.coverType === 'ADDONS');
       console.log("addOn" ,this.addOnCoverageList);
     }
  }

}
