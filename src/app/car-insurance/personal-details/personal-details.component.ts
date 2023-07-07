import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsuranceService } from 'src/app/core/services/insurance.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit,OnDestroy {

  personalDetails!:FormGroup;
  ownerDetailsForm:boolean = false;
  insuranceData:any;

  constructor(private fb:FormBuilder, private carInsService:InsuranceService){
      this.insuranceData = this.carInsService.carInsuranceModal;
      // console.log(this.insuranceData)

      (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
      // (pdfMake as any).fonts = {
    // Roboto : {

    // }
      // }

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
// this.carInsService.setPersonalDetails(this.personalDetails.value["owner-details"])

// const formData = {
//   "owner-details": {
//     "fullName": this.personalDetails.value["owner-details"]["fullName"],
//     "pinCode": this.personalDetails.value["owner-details"]["pinCode"],
//     "email": this.personalDetails.value["owner-details"]["email"],
//     "mobileNo": this.personalDetails.value["owner-details"]["mobile"]
//   }
// }
// this.carInsService.setPersonalDetails(formData);

// const carDetails = {
//   "car-details" : {
//     "regNumber" : this.personalDetails.value['car-details']['regNumber'],
//     "chasisNumber" : this.personalDetails.value['car-details']['chasisNumber'],
//     "engineNumber" : this.personalDetails.value['car-details']['engineNumber']
//   }
// }

// this.carInsService.setCarDetails(carDetails);
  }

  ngOnDestroy(): void {
    this.generatePDF();
  }
  generatePDF() {
    const documentDefinition: any = {
      content: [
        { text: 'Car Insurance Receipt', style: 'header', margin: [0, 0, 30, 0] },

        { text: 'Registration Details:', style: 'subheader', margin: [0, 10] },
        { text: `Brand Name: ${this.insuranceData.registrationDetails.brandName}`, style: 'label' },
        { text: `Model Name: ${this.insuranceData.registrationDetails.modelName}`, style: 'label' },
        { text: `Variant Name: ${this.insuranceData.registrationDetails.variantName}`, style: 'label' },
        { text: `Year: ${this.insuranceData.registrationDetails.year}`, style: 'label' },
        { text: `Month: ${this.insuranceData.registrationDetails.month}`, style: 'label' },
        { text: `City: ${this.insuranceData.registrationDetails.city}`, style: 'label' },

        { text: 'Selected Plan Details:', style: 'subheader', margin: [0, 10] },
        { text: `Plan Name: ${this.insuranceData.selectedPlan.planName}`, style: 'label' },

        { text: 'Personal Details', style: 'header', margin: [0, 10] },
        { text: 'Owner Details:', style: 'subheader', margin: [0, 5] },
        { text: `Full Name: ${this.personalDetails.get('owner-details.fullName')?.value}`, style: 'label', margin: [0, 5] },
        { text: `PinCode: ${this.personalDetails.get('owner-details.pinCode')?.value}`, style: 'label', margin: [0, 5] },
        { text: `Email Address: ${this.personalDetails.get('owner-details.email')?.value}`, style: 'label', margin: [0, 5] },
        { text: `Mobile Number: ${this.personalDetails.get('owner-details.mobile')?.value}`, style: 'label', margin: [0, 5] },

        { text: 'Car Details:', style: 'subheader', margin: [0, 10] },
        { text: `Registration Number: ${this.personalDetails.get('car-details.regNumber')?.value}`, style: 'label', margin: [0, 5] },
        { text: `Chasis Number: ${this.personalDetails.get('car-details.chasisNumber')?.value}`, style: 'label', margin: [0, 5] },
        { text: `Engine Number: ${this.personalDetails.get('car-details.engineNumber')?.value}`, style: 'label', margin: [0, 5] },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          color: '#002D62',
          alignment: 'center',
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 5]
        },
        label: {
          bold: true,
          color: 'grey'
        },

      }
    };

    pdfMake.createPdf(documentDefinition).open(); // Opens the PDF in a new tab
  }


}
