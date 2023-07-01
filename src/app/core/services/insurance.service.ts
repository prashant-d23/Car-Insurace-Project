import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {


  carInsuranceModal:CarInsurance = {
    "brandName":"",
    "modelName":"",
    "variantName":"",
    "year" : '',
    "month" : '',
    "city" : ''
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
