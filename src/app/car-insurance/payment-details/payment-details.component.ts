import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InsuranceService } from 'src/app/core/services/insurance.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

function _window(): any {
  // return the global native browser window object
  return window;
}


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {
  totalPremiumReceived!:Observable<Number>;
  window:any ;
  get nativeWindow(){
    return _window();
  }

  insuranceData:any;
  constructor(public router:Router,private carInsSvc:InsuranceService){
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    this.insuranceData = this.carInsSvc.carInsuranceModal;
  }
  ngOnDestroy(): void {

  }
  ngOnInit(){
   this.totalPremiumReceived = this.carInsSvc.totalPremiumObs$
  }

  generatePDF() {
    const documentDefinition: any = {
      content: [
        { text: 'Car Insurance Receipt', style: 'header', margin: [0, 0, 30, 0] },

        { text: 'Registration Details:', style: 'subheader', margin: [0, 10] },
        { text: `Brand Name: ${this.insuranceData.registrationDetails.brandName}`, style: 'label', margin: [0, 5] },
        { text: `Model Name: ${this.insuranceData.registrationDetails.modelName}`, style: 'label', margin: [0, 5] },
        { text: `Variant Name: ${this.insuranceData.registrationDetails.variantName}`, style: 'label', margin: [0, 5] },
        { text: `Year: ${this.insuranceData.registrationDetails.year}`, style: 'label', margin: [0, 5] },
        { text: `Month: ${this.insuranceData.registrationDetails.month}`, style: 'label', margin: [0, 5] },
        { text: `City: ${this.insuranceData.registrationDetails.city}`, style: 'label', margin: [0, 5] },

        { text: 'Selected Plan Details:', style: 'subheader', margin: [0, 10] },
        { text: `Plan Name: ${this.insuranceData.selectedPlan.planName}`, style: 'label' },

        { text: 'Personal Details', style: 'header', margin: [0, 10] },
        { text: 'Owner Details:', style: 'subheader', margin: [0, 5] },

        { text: `Full Name: ${this.insuranceData['personal-details']['owner-details']['fullName']}`, style: 'label', margin: [0, 5] },
        { text: `Pin Code: ${this.insuranceData['personal-details']['owner-details']['pinCode']}`, style: 'label', margin: [0, 5] },
        { text: `Email Address: ${this.insuranceData['personal-details']['owner-details']['email']}`, style: 'label', margin: [0, 5] },
        { text: `Mobile Number: ${this.insuranceData['personal-details']['owner-details']['mobile']}`, style: 'label', margin: [0, 5] },


        { text: 'Car Details:', style: 'subheader', margin: [0, 10] },
        {text : `Registration Number : ${this.insuranceData['personal-details']['car-details']['regNumber']}`, style: 'label', margin: [0, 5]},
        {text : `Chasis Number : ${this.insuranceData['personal-details']['car-details']['chasisNumber']}`, style: 'label', margin: [0, 5]},
        {text : `Engine Number : ${this.insuranceData['personal-details']['car-details']['engineNumber']}`, style: 'label', margin: [0, 5]}
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

  options = {
    "key": "rzp_test_HrtPRFmceuxnzS", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "AuthShield Insurance", //your business name
    "description": "Test Transaction",
    "image": "https://www.shutterstock.com/image-vector/car-secure-logo-template-design-260nw-1251461056.jpg",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Prashant", //your customer's name
        "email": "test@gmail.com",
        "contact": "9000090000" //Provide the customer's phone number for better conversion rates
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};

payNow(){

  var rzp1 = new this.nativeWindow.Razorpay(this.options);
  rzp1.open();
  this.generatePDF();
}


}


//rzp_test_HrtPRFmceuxnzS -api key
//mKXcoDjSxaCHxst0ecsOSI5y -key secret
