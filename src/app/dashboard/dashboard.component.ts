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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  ekycDetails:any;
  pubBlockaddr:any;
  opsType:any;
  email:any;
  res:any;
  res1:any;
  res2:any;
  res3:any;
  kycList:any=[];
  totalProcessCount:any;
  allRaisedInvoiceCount:any;
  totalProcessedCount:any;
  isBusiness:boolean=true;
  invoiceList:any=[];
  dataLength: boolean = false;
  dataLength1: boolean = false;
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
     this.opsType=this.ekycDetails.opsType;
     this.email=this.ekycDetails.email;
     this.pubBlockaddr = this.ekycDetails.blockaddr; 
     $(document).ready(function($) {
      $('#this_field').val('4').trigger('keyup'); 
     });
     // this.opsType = this.ekycDetails.opsType;  
   }

  


    raiseInvoiceData:any;
    raiseResponse:any;
   getAllRaisedInvoices(){
         this.showRised=true;
         this.showreceive=false;
        let postData={
           "email": this.email,
           "opsType":this.opsType ,
           "sts":1           
        }
        this.invoiceList=[];
        this.blockUI.start();
        this.data.getAllRaisedInvoices(postData).subscribe(data=>{
         this.res=data;
         this.blockUI.stop();
         if(this.res.statusCode=200){
           this.invoiceList=this.res.data;
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
    receiveinvoiceList:any=[];
    getAllReceivedInvoices(){
     this.showRised=false;
         this.showreceive=true;
      let postData={
           "email": this.email,
           "opsType":this.opsType
                    
        }      
        this.receiveinvoiceList=[];  
         this.blockUI.start();
       this.data.getAllReceivedInvoices(postData).subscribe(data=>{
         this.res=data;
            this.blockUI.stop();
         if(this.res.statusCode=200){
           this.receiveinvoiceList=this.res.data;
           if(this.receiveinvoiceList.length) {
              this.dataLength1 = false
             } else {
              this.dataLength1 = true;
             }
         }else{
           this.invoiceList = [];
           this.dataLength1 = true;
         }
       })
    }

 
  ngOnInit() {   
   this.getAllRaisedInvoices();
   this.getTotalInvoiceRaisedCount();
   this.getTotalProcessInvoiceCount();
   this.getTotalProcessedInvoiceCount();
}

getTotalInvoiceRaisedCount(){
  let postData={
          "pubBlockaddr":this.pubBlockaddr,
          "email": this.email,
          "opsType":this.opsType,
          "sts":1
        }
       this.data.getTotalInvoiceRaisedCount(postData).subscribe(data=>{
         this.res1=data;         
         if(this.res1.statusCode=200){
           this.allRaisedInvoiceCount=this.res1.data;          
         }
       })
}

getTotalProcessInvoiceCount(){
  let postData={
          "pubBlockaddr":this.pubBlockaddr,
          "email": this.email,
          "opsType":this.opsType,
          "sts":2
        }
       this.data.getTotalProcessInvoiceCount(postData).subscribe(data=>{
         this.res1=data;         
         if(this.res1.statusCode=200){
           this.totalProcessCount=this.res1.data;          
         }
       })
}

getTotalProcessedInvoiceCount(){
  let postData={
          "pubBlockaddr":this.pubBlockaddr,
          "email": this.email,
          "opsType":this.opsType,
          "sts":5
        }
       this.data.getTotalProcessedInvoiceCount(postData).subscribe(data=>{
         this.res1=data;
         
         if(this.res1.statusCode=200){
           this.totalProcessedCount=this.res1.data;          
         }
       })
}
showRised:boolean=true;
showreceive:boolean=false
showRaised(){
  this.showRised=true;
   this.showreceive=false;
}
showreceived(){
  
}
}
