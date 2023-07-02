import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {


  carInsuranceModal:any = {
    "brandName":"",
    "modelName":"",
    "variantName":"",
    "year" : '',
    "month" : '',
    "city" : '',
    "selectedPlan":{
      "planInfo":{},
      "costCoverage":{
       "netPremium":0,
       "thirdPartyPremium":0,
       "ownDamagePremium":0,
       "addOnsPremium":0,
       "ncbDiscount":0,
      }
   }

  }


  constructor() { }

  // getCarInsuranceModal(){
  //   return new CarInsurance();
  // }
}

export class CarInsurance{
  brandName!: string;
  modelName!:string;
  variantName!:string;
  year!:string;
  month!:string;
  city!:string;
}
