import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { InsuranceService } from 'src/app/core/services/insurance.service';

@Component({
  selector: 'app-select-variant',
  templateUrl: './select-variant.component.html',
  styleUrls: ['./select-variant.component.scss'],
})
export class SelectVariantComponent implements OnInit {
  selectedModal: string | null = null;
  variantTypes: string[] = [];
  variantList: any[] = [];
  insuranceData: any;

  selectedVariant: string = '';
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private carInsService: InsuranceService,
    private http: HttpService
  ) {
    this.selectedModal = this.activatedroute.snapshot.paramMap.get('modalName');

    this.insuranceData = this.carInsService.carInsuranceModal;
  }

  ngOnInit(): void {
    this.getVariantList();
  }

  getVariantList() {
    if (this.selectedModal) {
      const endPoint = 'get-variant?' + 'modelName=' + this.selectedModal;
      this.http.getDataFromServer(endPoint).subscribe((response: any) => {
        if (
          response &&
          response.length > 0 &&
          response[0].modelList.length > 0
        ) {
          const variants: string[] = response[0].modelList.map(
            (el: any) => el['Fuel Type']
          );
          this.variantTypes = [...new Set(variants)];
          this.selectedVariant = this.variantTypes[0];
          this.variantList = response[0].modelList;
          console.log(this.variantTypes);
        }
      });
    }
  }
  setVariantType(type:string){
    this.selectedVariant = type;
  }

  setVariantName(obj:any){
    this.insuranceData.variantName = obj['Variant Name'];
    this.router.navigate(['/car-insurance/registration-details'])
  }
}
