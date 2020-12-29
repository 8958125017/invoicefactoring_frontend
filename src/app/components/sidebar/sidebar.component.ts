import { Component, OnInit } from '@angular/core';
// import { GlobalConstant } from '../globalconstant';
import { FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule, RequiredValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
// import { CustomValidators } from '../validators';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $;
// import { MessageService } from '../messageservice.service';
import * as Chartist from 'chartist';

declare var $:any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'home_outline', class: '' },
    { path: '/land-record', title: 'Land Record',  icon:'library_books', class: 'landOwner' },
    { path: '/notifications', title: ' - Ownership Details',  icon:'', class: 'landOwnership' },
    { path: '/my-document', title: 'Civil Certificate',  icon:'library_books', class: 'civilOwner' },
    { path: '/civil-ownership-detail', title: ' - Ownership Details',  icon:'', class: 'civilOwnership' },
   

    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  ekycDetails:any;
  chaninAddress:any;
  myLandRecord:boolean = false;
  validatingAuthority:boolean = false;

  constructor(
    private router: Router,
    public loader: Ng4LoadingSpinnerService,
    private activatedRoute: ActivatedRoute,
  ) {
   

   }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    
    this.ekycDetails = sessionStorage.getItem('ekycDetails');
    this.chaninAddress = JSON.parse(this.ekycDetails).data.opsType;
  

    if(this.chaninAddress == "land"){
      $('.landOwner').show();
      $('.landOwnership').show();
      $('.civilOwner').hide();
      $('.civilOwnership').hide();
    }
    else{
      $('.landOwner').hide();
      $('.landOwnership').hide();
      $('.civilOwner').show();
      $('.civilOwnership').show();
    }
  }



  // isMobileMenu() {
  //     if ($(window).width() > 768) {
  //         return false;
  //     }
  //     return true;
  // };




}
