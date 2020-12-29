import { Injectable } from '@angular/core';
import { ConstantModule} from './constants';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { retry, catchError } from 'rxjs/operators';

import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { throwError } from 'rxjs';
import { Route, Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'userid':'1'
  })
};


@Injectable({
  providedIn: 'root'
})

export class ApiIntegrationService {


  constructor(private http: HttpClient,private constant:ConstantModule) { }
  public baseURL = this.constant.basePath;
 
  

  signup(data){
    return this.http.post(this.baseURL+'business/signup',data).pipe(
      retry(3)
    );
  }

  login(data){    
    return this.http.post(this.baseURL+'business/login',data, {
        headers: new HttpHeaders()
            .set('Content-Type', 'application/json'),
        observe: 'response'
    })
    .map(res => {    
      return res;        
    }).pipe(
      retry(3)         
    );
  }  

 uploadFile(data){
     return this.http.post(this.baseURL+'invoice/uploadFile',data).pipe(
      retry(3)
    );
 }

createInvoiceByseller(data){
	return this.http.post(this.baseURL+'invoice/createInvoiceBySeller',data).pipe(
      retry(3)
    );
}

getAllRaisedInvoices(data){
	return this.http.post(this.baseURL+'invoice/getAllRaisedInvoices',data).pipe(
      retry(3)
    );
}

getAllReceivedInvoices(data){
  return this.http.post(this.baseURL+'invoice/getAllReceivedInvoices',data).pipe(
      retry(3)
    );
}

getIssuedinvoice(data){
  return this.http.post(this.baseURL+'invoice/getIssuedinvoice',data).pipe(
      retry(3)
    );
}

getAllLenderInvoices(data){
  return this.http.post(this.baseURL+'invoice/getAllLenderInvoices',data).pipe(
      retry(3)
    );
}




buyerResponseInvoice(data){
	return this.http.post(this.baseURL+'invoice/buyerResponseInvoice',data).pipe(
      retry(3)
    );
}

sellerLenderSubmit(data){
	return this.http.post(this.baseURL+'invoice/sellerLenderSubmit',data).pipe(
      retry(3)
    );
}

LenderSubmit(data){
	return this.http.post(this.baseURL+'invoice/LenderSubmit',data).pipe(
      retry(3)
    );
}


viewAllreisedInvoiceByStatus(data){
	return this.http.post(this.baseURL+'invoice/viewAllreisedInvoiceByStatus',data).pipe(
      retry(3)
    );
}

viewInvoiceByID(data){
	return this.http.post(this.baseURL+'invoice/viewInvoiceByID',data).pipe(
      retry(3)
    );
}

getProcessedInvoiceCount(data){
  return this.http.post(this.baseURL+'invoice/getProcessedInvoiceCount',data).pipe(
      retry(3)
    );
}
getApprovedInvoiceCount(data){
  return this.http.post(this.baseURL+'invoice/getApprovedInvoiceCount',data).pipe(
      retry(3)
    );
}

getTotalInvoiceRaisedCount(data){  
  return this.http.post(this.baseURL+'invoice/getTotalInvoiceRaisedCount',data).pipe(
      retry(3)
    );
}

getTotalProcessInvoiceCount(data){  
  return this.http.post(this.baseURL+'invoice/getTotalProcessInvoiceCount',data).pipe(
      retry(3)
    );
}
getTotalProcessedInvoiceCount(data){  
  return this.http.post(this.baseURL+'invoice/getTotalProcessedInvoiceCount',data).pipe(
      retry(3)
    );
}

// Ekyc api service


  // signup(data){
  //   return this.http.post(this.baseURL+'signup',data).pipe(
  //     retry(3)
  //   );
  // }

  // login(data){    
  //   return this.http.post(this.baseURL+'businesslogin',data, {
  //       headers: new HttpHeaders()
  //           .set('Content-Type', 'application/json'),
  //       observe: 'response'
  //   })
  //   .map(res => {    
  //     return res;        
  //   }).pipe(
  //     retry(3)         
  //   );
  // }  

  registerKyc(data){
    return this.http.post(this.baseURL+'registerKyc',data).pipe(
      retry(3)
    );
  }
  getallKYC(data){
    return this.http.post(this.baseURL+'getallKYC',data).pipe(
      retry(3)
    );
  }
  
  getIssuedKyc(data){
    return this.http.post(this.baseURL+'getIssuedKyc',data).pipe(
      retry(3)
    );
  }

   searchKYC(data){
    return this.http.post(this.baseURL+'searchKYC',data).pipe(
      retry(3)
    );
  }

  getAllKycCount(data){
    return this.http.post(this.baseURL+'getAllKycCount',data).pipe(
      retry(3)
    );
  }

  getAllBusinessCount(data){
    return this.http.post(this.baseURL+'getAllBusinessCount',data).pipe(
      retry(3)
    );
  }
   getAllBusinessKycCount(data){
    return this.http.post(this.baseURL+'getAllBusinessKycCount',data).pipe(
      retry(3)
    );
  }

 }
