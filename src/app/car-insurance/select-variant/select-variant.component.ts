import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { InsuranceService } from 'src/app/core/services/insurance.service';

@Component({
  selector: 'app-select-variant',
  templateUrl: './select-variant.component.html',
  styleUrls: ['./select-variant.component.scss']
})
export class SelectVariantComponent implements OnInit {

  selectedModal : string | null = null;
  constructor(private activatedroute:ActivatedRoute, private router:Router, private carInsService:InsuranceService, private http:HttpService){
    this.selectedModal = this.activatedroute.snapshot.paramMap.get('modalName')
  }

  ngOnInit(): void {
    this.getVariantList();
  }
  getVariantList(){
    if(this.selectedModal){
      const endPoint = 'get-variant?' + 'modelName=' + this.selectedModal;
   this.http.getDataFromServer(endPoint).subscribe((response:any)=>{
    if(response && response.modalList.length > 0){
      console.log(response[0].modalList)
    }
   })
    }
  }



}
