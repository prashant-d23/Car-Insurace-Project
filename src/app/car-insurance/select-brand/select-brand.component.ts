import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarInsurance, InsuranceService} from 'src/app/core/services/insurance.service';

@Component({
  selector: 'app-select-brand',
  templateUrl: './select-brand.component.html',
  styleUrls: ['./select-brand.component.scss']
})
export class SelectBrandComponent {

  searchTerm:string = '';

  selectBrand:any = [
    {
      "imgPath" : "../../../assets/tata-logo.png",
      "brandName" : "TATA",
    },
    {
      "imgPath" : "https://www.carlogos.org/car-logos/kia-logo.png",
      "brandName" : "KIA",
    },
    {
      "imgPath" : "https://th.bing.com/th/id/OIP.pCHNMOCEIbHFpB-IdmAPQQHaHa?pid=ImgDet&rs=1",
      "brandName" : "Maruti",
    },
    {
      "imgPath" : "https://www.carlogos.org/car-logos/audi-logo-2016-640.png",
      "brandName" : "AUDI",
    },

]
// carInsuranceModal!:CarInsurance;
insuranceData:any;

constructor(private carInsService:InsuranceService, private router:Router){
  this.insuranceData = this.carInsService.carInsuranceModal;
}

selectBrandName(name:string){
  // this.carInsuranceModal.brandName = info;
  this.insuranceData.registrationDetails.brandName = name;
console.log(name)
this.router.navigate(['/car-insurance/select-modal',name]);
}

onSearchChange(evt:string){
  this.searchTerm = evt;
}
}
