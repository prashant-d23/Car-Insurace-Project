import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InsuranceService } from 'src/app/core/services/insurance.service';

function _window(): any {
  // return the global native browser window object
  return window;
}


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent {
  totalPremiumReceived!:Observable<Number>;
  window:any ;
  get nativeWindow(){
    return _window();
  }

  constructor(public router:Router,private carInsSvc:InsuranceService){

  }
  ngOnInit(){
   this.totalPremiumReceived = this.carInsSvc.totalPremiumObs$
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
}
}


//rzp_test_HrtPRFmceuxnzS -api key
//mKXcoDjSxaCHxst0ecsOSI5y -key secret
