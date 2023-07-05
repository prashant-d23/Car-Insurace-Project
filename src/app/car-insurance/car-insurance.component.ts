import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-car-insurance',
  templateUrl: './car-insurance.component.html',
  styleUrls: ['./car-insurance.component.scss']
})
export class CarInsuranceComponent implements OnInit {
  progress = 25;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateProgress();
      }
    });
  }

  updateProgress() {
    const currentRoute = this.router.routerState.snapshot.url;
    const routes = [
      '/car-insurance',
      '/car-insurance/choose-plan',
      '/car-insurance/personal-details',
      '/car-insurance/payment'
    ];
    this.progress = (routes.indexOf(currentRoute) / (routes.length - 1)) * 100;
  }
}
