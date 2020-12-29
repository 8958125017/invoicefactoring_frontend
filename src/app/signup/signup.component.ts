import { Component, OnInit} from '@angular/core';
import { ApiIntegrationService } from '../api-integration.service';
import { ToastrService } from 'ngx-toastr';
import { GlobalConstant } from '../globalconstant';
import { FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router,ActivatedRoute} from  '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomValidators } from '../validators';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $;
import { MessageService } from '../messageservice.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI; 

showDeemed:boolean=false;
public isValidFormSubmitted = null;
public isSignupValidFormSubmitted = null;
clearSetTimeout:any;
pendingRequest:any;
  
 constructor(
  private data:ApiIntegrationService,
  private toastr: ToastrService,
  private fb: FormBuilder,
  private router:Router,
  public  constants:GlobalConstant, 
  public  loader: Ng4LoadingSpinnerService,
  private activatedRoute:ActivatedRoute,
  private messgage : MessageService
  ) { } 

public businessForm:FormGroup;
public customerForm:FormGroup;
changePasswordFormInit(){
  this.businessForm = this.fb.group({
          opsType: new FormControl('', [Validators.required]), 
          bEmail: new FormControl('', [Validators.required, Validators.email]),
          bNumber: new FormControl('',[Validators.required]),
          bAddress: new FormControl('', [Validators.required]),         
          country: new FormControl(''),  
          state: new FormControl(''), 
          crNumber: new FormControl('',[Validators.required]),
          trNumber:new FormControl('', [Validators.required]),
          password : new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
          confirmPassword:new FormControl('', Validators.required)}, { validator: this.matchingPasswords('password', 'confirmPassword') });
       }

      matchingPasswords(passwordKey: string, confirmPasswordKey: string) {      
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }

    docFile:any

file:any;
fileName:any;
 fileUpload(event){
   
    let reader = new FileReader();
    this.file = event.target.files[0];  
   if(!this.file){
       this.fileName = this.file.name;
      this.toastr.error('Please Upload Doc File');
      return false;
    }
}

// selectItom(item:any){
//   this.businessForm.value.instType=item.value;
//    if(item.value=='University'){
//     //  this.showDeemed=true;
//   }else{
//     // this.showDeemed=false;
//   }
// }


//-----------------signup start here--------------------//
signup(){  
  
  this.isValidFormSubmitted = false;
   if(!this.businessForm.value.opsType){
          this.toastr.error('Please select Account type');
          return false;    
        }else if(this.businessForm.value.bEmail== ''){
           this.toastr.error('Please enter  email'); 
           return false;  
         }
         // else if(this.businessForm.value.bNumber== ''){
         //    this.toastr.error('Please enter mobile number'); 
         //  return false; 
         // }
           else if(this.businessForm.value.bAddress== ''){
          this.toastr.error('Please enter Business Address'); 
          return false;  
         }  else if(this.businessForm.value.crNumber== ''){
          this.toastr.error('Please enter Company Registration number'); 
          return false;  
         }
         else if(this.businessForm.value.trNumber== ''){
          this.toastr.error('Please enter Tax Registration number'); 
          return false;  
         }         
         else if(this.businessForm.value.password== ''){
          this.toastr.error('Please enter password'); 
          return false;  
         }
         else if(this.businessForm.value.password != this.businessForm.value.confirmPassword ){
          this.toastr.error('Password Not matched'); 
          return false;  
         }
       else if(this.businessForm.valid){  
         this.isValidFormSubmitted = true;       
       let postData={
                "opsType":this.businessForm.value.opsType,
                "email":this.businessForm.value.bEmail,
                // "mobile":this.businessForm.value.bNumber, 
                "businessAddress":this.businessForm.value.bAddress, 
                // "country":this.businessForm.value.country,
                // "state":this.businessForm.value.state,
                "cmp_reg_no":this.businessForm.value.crNumber, 
                "tax_reg_no":this.businessForm.value.trNumber, 
                "password":this.businessForm.value.password ,
               } 
               clearTimeout(this.clearSetTimeout);
               this.blockUI.start();
               this.pendingRequest=this.data.signup(postData).subscribe((data) => {
                clearTimeout(this.clearSetTimeout);
                this.blockUI.stop();               
                 
                this.isSignupValidFormSubmitted = false;
                  if(data['statusCode'] ==200){
                     this.toastr.success(data['message']);
                     this.businessForm.reset();
                   this.router.navigate(['/login']);                    
                  }
                 else{
                      this.toastr.error(data['message']);                    
                      }

                },error => {
                           this.blockUI.stop();
                           clearTimeout(this.clearSetTimeout);
                             this.toastr.error('Not able to connect host, please try again');
                           })
                  this.clearSetTimeout = setTimeout(() => {
                      this.pendingRequest.unsubscribe();
                      this.blockUI.stop();
                 },30000);
     }else{
        this.isValidFormSubmitted = false;
         this.toastr.error('something went wrong');
     }
  
}

//-----------------signup end here--------------------//

  ngOnInit() {
   this.changePasswordFormInit();
  }


}
