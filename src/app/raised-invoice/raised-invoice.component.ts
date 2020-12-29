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
  selector: 'app-raised-invoice',
  templateUrl: './raised-invoice.component.html',
  styleUrls: ['./raised-invoice.component.scss']
})
export class RaisedInvoiceComponent implements OnInit {
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

   getAllRaisedInvoices(){
        let postData={
           "email": this.email,
  	       "opsType":this.opsType,
  	       "sts":"1"
        }   
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

     ngOnInit() {
      this.getAllRaisedInvoices();
    }

}