import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {


  carInsuranceModal:CarInsurance = {
    "brandName":"",
    "modelName":"",
    "variantName":"",
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
}
