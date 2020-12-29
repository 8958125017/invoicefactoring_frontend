import { Component, OnInit } from '@angular/core';
import { ApiIntegrationService } from '../api-integration.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstant } from '../globalconstant';
import { FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormArray,FormsModule } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomValidators } from '../validators';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $;
import { MessageService } from '../messageservice.service';

@Component({
  selector: 'app-received-invoice',
  templateUrl: './received-invoice.component.html',
  styleUrls: ['./received-invoice.component.scss']
})
export class ReceivedInvoiceComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  ekycDetails:any;
  pubBlockaddr:any;
  res:any;
  invoiceList:any=[];
  email:any;
  opsType:any;
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
     this.opsType=this.ekycDetails.opsType;
     this.email=this.ekycDetails.email;
     this.pubBlockaddr = this.ekycDetails.blockaddr;    
   }

   getAllLenderInvoices(){
        let postData={
           "email": this.email,
	         "opsType":this.opsType               
        }   
        this.blockUI.start();     
       this.data.getAllLenderInvoices(postData).subscribe(data=>{
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
     getAllReceivedInvoices(){
        let postData={
           "email": this.email,
           "opsType":this.opsType        
        }
        this.blockUI.start(); 
       this.data.getAllReceivedInvoices(postData).subscribe(data=>{
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

     ngOnInit() {
       if(this.opsType==='lender'){
         this.getAllLenderInvoices();
       }else{
          this.getAllReceivedInvoices();
        }      
     
    }

}