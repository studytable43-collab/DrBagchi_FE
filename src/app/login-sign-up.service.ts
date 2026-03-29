import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginSignUpService 
{
 private baseurl = environment.baseUrl;
  
 
 constructor(private http:HttpClient ,private router:Router)
   {



    }

getCourses( )
{

// let params = new HttpParams();
// params = params.append('flag', flag);
// params = params.append('Tab', Tab);
// params = params.append('PatientId',id);

//     const token = localStorage.getItem('token');  
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });
    
//     return this.http.get<any>(`${this.baseurl}api/GetPatientsorReports`, {
//      params, headers: headers,
//       withCredentials: false
//     });

}

getAvailableBoards() {
  const unique = Math.random();

  return this.http.get<any>(
    `${this.baseurl}api/guest/GetAvailableBoards?_=${unique}`,
    { withCredentials: false }
  );
}


getAvailableClasses() {
  const unique = Math.random();

  return this.http.get<any>(
    `${this.baseurl}api/guest/GetAvailableClasses?_=${unique}`,
    { withCredentials: false }
  );
}
getAvailableSubjects(ClassId:any)
{
   
let params = new HttpParams()
.set("ClassId",+ClassId);

   const unique = Math.random(); // or crypto.randomUUID() if supported
  return this.http.get<any>(`${this.baseurl}api/guest/GetAvailableSubjects?_=${unique}`, 
    {
      params:params,
    withCredentials: false
    }); 
}



getAvailableBatches(ClassId:any,subjectid:any,boardid:any)
{
   
let params = new HttpParams()
.set("ClassId",+ClassId).set('SubjectId',subjectid).set('BoardId',boardid);
 
   const unique = Math.random(); // or crypto.randomUUID() if supported
  return this.http.get<any>(`${this.baseurl}api/guest/GetAvailableBatches?_=${unique}`, 
    {
      params:params,
    withCredentials: false
  }); 
}


SubmitSignUp(formData:any)
{


    const token = localStorage.getItem('token'); // Or wherever you store your token

    if(!token)
    {
const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  }); 
  const unique = Math.random(); 
  return this.http.post<any>(`${this.baseurl}api/guest/SubmitSignup?_=${unique}`,formData,{
 headers,   withCredentials :false
   })
 
    }



  const unique = Math.random(); 
  return this.http.post<any>(`${this.baseurl}api/guest/SubmitSignup?_=${unique}`,formData,{
    withCredentials :false

  })
}


ValidateUser(Mobile:any,Password:any)
{
let dto =
{
  Email : Mobile,
  Password:Password
}

const unique = Math.random(); 
  return this.http.post<any>(`${this.baseurl}api/guest/Authenticate?_=${unique}`,dto,{
    withCredentials :true

  })
}
submitOTP(mobile: string, purpose: string, otp: string) {


  const params = new HttpParams()
    .set('mobile', mobile)   // 🔹 hardcoded mobile
    .set('purpose', 'SIGNUP')      // 🔹 hardcoded purpose
    .set('otp', otp);         // 🔹 hardcoded OTP

  return this.http.post<any>(
    `${this.baseurl}api/guest/VerifyOTP`,
    null,
    {
      params: params,
      withCredentials: false
    }
  );
}

SendOTP(mobile: any, purpose: string, otp: string) 
{
  const params = new HttpParams()
    .set('mobile', mobile)   // 🔹 hardcoded mobile
    .set('purpose', 'SIGNUP')      // 🔹 hardcoded purpose
 
  return this.http.post<any>(
    `${this.baseurl}api/guest/SendOTP`,
    null,
    {
      params: params,
      withCredentials: false
    }
  );
  
}

SendEmailOTP(Email: any, purpose: string, otp: string)
{
   const params = new HttpParams()
    .set('Email', Email)   // 🔹 hardcoded mobile
    .set('purpose', 'SIGNUP')      // 🔹 hardcoded purpose
 
  return this.http.post<any>(
    `${this.baseurl}api/guest/SendEmailOTP`,
    null,
    {
      params: params,
      withCredentials: false
    }
  );

}


CheckMobileExist(mobile:any)
{
  
  const params = new HttpParams()
    .set('Mobile', mobile)   // 🔹 hardcoded mobile
  
  return this.http.post<any>(
    `${this.baseurl}api/guest/CheckMobileExist`,
    null,
    {
      params: params,
      withCredentials: false
    }
  ); 
}

checkEmailExist(Email:any)
{
  
  const params = new HttpParams()
    .set('Email', Email)   // 🔹 hardcoded Email
  
  return this.http.post<any>(
    `${this.baseurl}api/guest/CheckEmailExist`,
    null,
    {
      params: params,
      withCredentials: false
    }
  ); 
}

ResetPassword(mobile:any, newpassword:any)
{ 
  const params = new HttpParams()
    .set('Mobile', mobile)    
    .set('Password', newpassword);
  return this.http.post<any>(
    `${this.baseurl}api/guest/ResetPassword`,
    null,
    {
      params: params,
      withCredentials: false
    }
  );  
}
VerifyEmailOTP(Email: any, purpose: string, otp: string)
{
  
  const params = new HttpParams()
    .set('Email', Email)   // 🔹 hardcoded Email
    .set('purpose', 'SIGNUP')      // 🔹 hardcoded purpose
    .set('otp', otp);         // 🔹 hardcoded OTP

  return this.http.post<any>(
    `${this.baseurl}api/guest/VerifyEmailOTP`,
    null,
    {
      params: params,
      withCredentials: false
    }
  );
}

 


}
