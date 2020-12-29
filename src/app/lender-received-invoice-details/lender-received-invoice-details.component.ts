import { Component, OnInit } from '@angular/core';
import { ApiIntegrationService } from '../api-integration.service';
import { GlobalConstant } from '../globalconstant';
import { FormControl, FormsModule,FormBuilder, Validators, FormGroup, ReactiveFormsModule, RequiredValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomValidators } from '../validators';
declare var $;
import { MessageService } from '../messageservice.service';
import * as Chartist from 'chartist';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lender-received-invoice-details',
  templateUrl: './lender-received-invoice-details.component.html',
  styleUrls: ['./lender-received-invoice-details.component.scss']
})
export class LenderReceivedInvoiceDetailsComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
  invoiceId:any;
  ekycDetails:any
  pubBlockaddr:any;
  businessName:any;
  loan_tenure:any;
  roi:any;
  amountDisburse:any;
  email:any;
  invoiceDetails:any
  res:any;
  opsType:any;
 constructor( 
              private data:ApiIntegrationService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private router:Router,
              public  constants:GlobalConstant, 
              private activatedRoute:ActivatedRoute,
              private messgage : MessageService) { 
		           this.ekycDetails =JSON.parse(localStorage.getItem('ekycDetails')); 
               this.opsType=this.ekycDetails.opsType;
               this.email=this.ekycDetails.email;
               this.pubBlockaddr = this.ekycDetails.blockaddr;
   }

 ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        this.invoiceId = params['invoiceId'];
         this.getIssuedinvoice(this.invoiceId);
        });
  }

  invoiceList:any=[];
  
  getIssuedinvoice(id){
    let postData={
      "invoiceID":id     
     }
     this.data.getIssuedinvoice(postData).subscribe(res=>{
       this.res=res;
       
       if(this.res.statusCode==200){
          this.invoiceDetails=this.res.data[0];
          this.invoiceList=this.invoiceDetails.invoice;
        }
     })
  }


  file:any;
  fileName:any;

  docFile:any;
  docFileName:any;
  
 fileUpload(event){   
    let reader = new FileReader();
    this.file = event.target.files[0];
      if(this.file){       
        this.docFile=this.file;
        this.docFileName = this.file.name;   
  }else{
       this.toastr.error('Please Upload Doc File');
      return false;
    }
}

resp:any;
accept(){
  if(!this.amountDisburse){
    this.toastr.error('please enter amount');
    return false
  }else if(!this.roi){
    this.toastr.error('please enter rate of interest');
    return false
  }else if(!this.loan_tenure){
    this.toastr.error('please enter loan tenure');
    return false
  }else{
    let postData={
      "pubBlockaddr":this.pubBlockaddr,
      "email": this.email,
      "opsType":"lender",
      "invoiceID":this.invoiceDetails.id,
      "lendingAmount": this.amountDisburse,
      "lendingInterest": this.roi,
      "dateOfPayment": this.loan_tenure,
      "sts": true
  }  
  this.blockUI.start();
  this.data.LenderSubmit(postData).subscribe(res=>{
   this.resp=res;
   this.blockUI.stop();
   if(this.resp.statusCode==200){
     this.toastr.success('message');
     this.router.navigate(['/lenderDashboard']) 
   }else{
      this.toastr.error('something wwent wrong');
   }
  })
  
}

}

reject(){

}

}
