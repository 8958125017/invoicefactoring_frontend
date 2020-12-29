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
  selector: 'app-invoice-received',
  templateUrl: './invoice-received.component.html',
  styleUrls: ['./invoice-received.component.scss']
})
export class InvoiceReceivedComponent implements OnInit {
@BlockUI() blockUI: NgBlockUI;
kycId:any;
ekycDetails:any
pubBlockaddr:any;
businessName:any;
docRes:any;
opsType:any;
email:any;
invoiceDetails:any;
invoiceId:any;
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

res:any;
 file:any;
  fileName:any;

  docFile:any;
  docFileName:any;
  url:any="http://49.50.67.44/docs/1586517835761_formBg.png";
 fileUpload(event){   
    let reader = new FileReader();
    this.file = event.target.files[0];
      if(this.file){       
        this.docFile=this.file;
        this.docFileName = this.file.name;
        let postData = new FormData();          
         postData.append('doc', this.docFile , this.docFileName);
         this.data.uploadFile(postData).subscribe(res=>{
          this.docRes=res;
          if(this.docRes.statusCode==200){            
            this.url=this.docRes.data
          }else{
            this.toastr.error(this.docRes.message);
             }         
        })   
  }else{
       this.toastr.error('Please Upload Doc File');
      return false;
    }
}
resp:any;
accept(){
  if(!this.url){
    this.toastr.error('please upload document');
    return false;
  }else{
    let postData={
      "pubBlockaddr":this.pubBlockaddr,
      "email": this.email,
      "opsType":"business",
      "invoiceID":this.invoiceDetails.id,
      "sts": true,
      "nodalReceipt": this.url
     }
      this.blockUI.start();
     this.data.buyerResponseInvoice(postData).subscribe(res=>{
       this.resp=res;
        this.blockUI.stop();
       if(this.resp.statusCode==200){
       }else{

       }
     })
   }
}

reject(){
this.toastr.error('Request has been rejected');
}

}
