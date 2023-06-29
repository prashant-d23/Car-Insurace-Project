import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { InsuranceService } from 'src/app/core/services/insurance.service';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.component.html',
  styleUrls: ['./select-modal.component.scss']
})
export class SelectModalComponent implements OnInit {

  constructor(private route:ActivatedRoute, private http:HttpService, private carInsService:InsuranceService){
    this.selectedBrand = this.route.snapshot.paramMap.get('brandName');
    this.insuranceData = this.carInsService.carInsuranceModal;
    console.log(this.selectedBrand)
  }

  selectedBrand:string | null = null;
  modalList:any[] = []
  insuranceData:any;

  ngOnInit(){
    this.getModalList();
  }

  getModalList(){
    const endPoint = "brands?" + "brandName=" + this.selectedBrand;
    this.http.getDataFromServer(endPoint).subscribe((res:any)=>{
      if(res && res.length > 0){
        this.modalList = res[0].models
      }
      console.log(res)
    },
    error=>{
      console.log("Internal Server Error")
    })
  }

  selectModal(modal:any){
    this.insuranceData.modelName = modal;
  }
}
