import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  totalPremium = new BehaviorSubject<Number>(0);
  totalPremiumObs$ = this.totalPremium.asObservable();

  constructor() { }

  carInsuranceModal:any = {
    "brandName":"",
    "modelName":"",
    "variantName":"",
    "year" : '',
    "month" : '',
    "city" : '',
    "selectedPlan":{
      "planName":"",
      "planInfo":{},
      "selectedIdv":0,
      "costCoverage":{
       "netPremium":0,
       "thirdPartyPremium":0,
       "ownDamagePremium":0,
       "addOnsPremium":0,
       "ncbDiscount":0,
      }
   },
   "registration-details":{

   },
   "personal-details":{
     "owner-details":{

     },
     "car-details":{

     }
   }

  }


   sendTotalPremium(amount:number){
     this.totalPremium.next(amount);
   }




}

export class CarInsurance{
  brandName!: string;
  modelName!:string;
  variantName!:string;
  year!:string;
  month!:string;
  city!:string;
}
