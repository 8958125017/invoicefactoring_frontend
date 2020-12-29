import { Component, OnInit} from '@angular/core';
import { ApiIntegrationService } from '../api-integration.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstant } from '../globalconstant';
import { FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router,ActivatedRoute} from  '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomValidators } from '../validators';
declare var $;
import { MessageService } from '../messageservice.service';
@Component({
  selector: 'app-lender-dashboard',
  templateUrl: './lender-dashboard.component.html',
  styleUrls: ['./lender-dashboard.component.scss']
})
export class LenderDashboardComponent implements OnInit {
 @BlockUI() blockUI: NgBlockUI;
  ekycDetails:any;
  pubBlockaddr:any;

  res:any;
  res1:any;
  res2:any;
  res3:any;
  kycList:any=[];
  totalApprovedCount:any;
  allProcessedCount:any;
  amountDisburseCount:any;
  isBusiness:boolean=true;
  opsType:any;
  email:any;
   dataLength: boolean = false;
  constructor(
              private data:ApiIntegrationService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private router:Router,
              public  constants:GlobalConstant, 
              private activatedRoute:ActivatedRoute,
              private messgage : MessageService
  ) {
     this.ekycDetails =JSON.parse(localStorage.getItem('ekycDetails')); 
     this.pubBlockaddr = this.ekycDetails.blockaddr; 
     this.opsType=this.ekycDetails.opsType;
     this.email=this.ekycDetails.email; 
          $(document).ready(function($) {
  $('#this_field').val('4').trigger('keyup'); 
});
   }

   invoiceList:any=[];
   getAllReceivedInvoices(){
        let postData={
           "email": this.email,
           "opsType":this.opsType ,
                  
        }        
        this.blockUI.start();
       this.data.getAllLenderInvoices(postData).subscribe(data=>{
         this.res=data;  
         this.blockUI.stop();       
         if(this.res.statusCode=200){
           this.invoiceList=this.res.data;
           this.allProcessedCount=this.res.count
           if(this.invoiceList.length) {
              this.dataLength = false
             } else {
              this.dataLength = true;
             }
         }else{
           this.invoiceList = [];
           this.dataLength = true;
         }
       })
    }

       getProcessedInvoiceCount(){
        let postData={
          "sts":5
        }
       this.data.getProcessedInvoiceCount(postData).subscribe(data=>{
         this.res1=data;
         
         if(this.res1.statusCode=200){
           this.allProcessedCount=this.res1.data;          
         }
       })
    }

    getApprovedInvoiceCount(){
        let postData={
          "sts":2
        }
       this.data.getApprovedInvoiceCount(postData).subscribe(data=>{
         this.res1=data;
         
         if(this.res1.statusCode=200){
           this.totalApprovedCount=this.res1.data;          
         }
       })
    }

 
 
  ngOnInit() {
   this.getAllReceivedInvoices();
   this.getProcessedInvoiceCount();
   this.getApprovedInvoiceCount();
   // this.getamountDisburseCount();
}
showRised:boolean=true;
showreceive:boolean=false
showRaised(){
  this.showRised=true;
   this.showreceive=false;
}
showreceived(){
  this.showreceive=true;
  this.showRised=false;
}
}
