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
  selector: 'app-raisenewinvoice',
  templateUrl: './raisenewinvoice.component.html',
  styleUrls: ['./raisenewinvoice.component.scss']
})
export class RaisenewinvoiceComponent implements OnInit {
@BlockUI() blockUI: NgBlockUI;
kycDetails:any;
pubBlockaddr:any;
clearSetTimeout:any;
pendingRequest:any;
email:any;
opsType:any;
public isValidFormSubmitted = null;
public docArray:any = [
                          {
                              "invoiceNo"  :"",
                              "invoiceAmount":"",
                              "invoiceDate":"",
                              "invoiceDoc":""
                
                          }
                        ]
 constructor(
private data:ApiIntegrationService,
private formBuilder: FormBuilder,
private toastr: ToastrService,
private fb: FormBuilder,
private router:Router,
public constants:GlobalConstant,
public loader: Ng4LoadingSpinnerService,
private activatedRoute:ActivatedRoute,
private messgage : MessageService) {
   this.kycDetails =JSON.parse(localStorage.getItem('ekycDetails')); 
   this.opsType=this.kycDetails.opsType;
   this.email=this.kycDetails.email;
   this.pubBlockaddr = this.kycDetails.blockaddr;  
}
ekycForm:FormGroup;
  ngOnInit() {
  	this.addEkycInit();
  }

  addEkycInit(){
  	this.ekycForm=this.fb.group({  	    
  		pcid: new FormControl(''),		
  		lender_Id: new FormControl(''),
  		totalInvoice: new FormControl(''),		
  	})
  }

  file:any;
  fileName:any;

  docFile:any;
  docFileName:any;
 fileUpload(event,i){   
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
            this.docArray[i].invoiceDoc =this.docRes.data;
          }         
        })   
  }else{
       this.toastr.error('Please Upload Doc File');
      return false;
    }
}

postData:any;
docRes:any
  submitInvoice(){  
  
    if(!this.ekycForm.value.pcid){
      this.toastr.error('Please enter  Buyer Registred EmailId');
      return false;
    }if(!this.docArray[this.i].invoiceNo) {
        this.toastr.error('please enter Invoice Number');
        return false;
      } else if(this.docArray[this.i].invoiceNo && !this.docArray[this.i].invoiceDoc){
      this.toastr.error('Please Upload Document File for Invoice Number');
        return false;
      }else if(!this.docArray[this.i].invoiceNo && this.docArray[this.i].invoiceDoc){
        this.toastr.error('Please enter Invoice Number ');
        return false;
      }else if(!this.docArray[this.i].invoiceAmount){
        this.toastr.error('Please enter invoice amount');
        return false;
      }else if(!this.docArray[this.i].invoiceDate){
        this.toastr.error('Please enter invoice Date');
        return false;
      }else if(!this.ekycForm.value.lender_Id){
       this.toastr.error('Please enterlender emailId');
      return false;
    }
      else if(!this.ekycForm.value.totalInvoice){
       this.toastr.error('Please enterTotal Invoice');
      return false;
    }else if(this.ekycForm.valid){
        this.postData={
          "issuingCompanyEmail"    : this.email,
          "purchasingCompanyEmail" : this.ekycForm.value.pcid,
          "lenderEmail"            : this.ekycForm.value.lender_Id,
          "pubBlockaddr"           : this.pubBlockaddr,
          "invoice"                : this.docArray,
          "totalInvoiceAmount"     : this.ekycForm.value.totalInvoice
        }
        clearTimeout(this.clearSetTimeout);
        this.blockUI.start('Loading...');
        this.pendingRequest=this.data.createInvoiceByseller(this.postData).subscribe(res=>{
            this.blockUI.stop();            
            this.response=res; 
            clearTimeout(this.clearSetTimeout);
            if(this.response.statusCode==200){
               this.toastr.success('Invoice raise successfully');
              this.router.navigate(['/Raised_Invoice']);
            }else{
               this.toastr.error('some thing went wrong');
            }

        },error => {               
               this.blockUI.stop();          
               this.toastr.error('Not able to connect host, please try again');      
               })        
                  this.clearSetTimeout = setTimeout(() => {
                  this.pendingRequest.unsubscribe();
                  this.blockUI.stop();
               },1200000);


    }else{
           this.isValidFormSubmitted = false;
           this.toastr.error('some thing went wrong');
         }
  }
    response:any;
    i:any=0;
    addMore(i:any){
     
      this.i=i;    
      if(!this.docArray[this.i].invoiceNo) {
        this.toastr.error('please enter Invoice Number');
        return false;
      } else if(this.docArray[this.i].invoiceNo && !this.docArray[this.i].invoiceDoc){
      this.toastr.error('Please Upload Document File for invoice number');
        return false;
      }else if(!this.docArray[this.i].invoiceNo && this.docArray[this.i].invoiceDoc){
        this.toastr.error('Please enter invoice number');
        return false;
      }else if(!this.docArray[this.i].invoiceAmount){
        this.toastr.error('Please enter invoice amount');
        return false;
      }else if(!this.docArray[this.i].invoiceDate){
        this.toastr.error('Please enter invoice Date');
        return false;
      }else{
                  this.docArray.push({
                              "invoiceNo"  :"",
                              "invoiceAmount":"",
                              "invoiceDate":"",
                              "invoiceDoc":""
              })    
                  this.i=i+1;
               
      }
           
   
      }

      remove(i){
        this.i=i;
        if(this.i){
           this.docArray.splice(this.i, 1);
           if(this.i!=0)
            this.i=this.i-1
          }       
      }
}
