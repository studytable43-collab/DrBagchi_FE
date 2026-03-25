import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {

private baseurl = environment.baseUrl;
private admin_url = environment.admin_baseurl
 
 constructor(private http:HttpClient ,private router:Router)
   { }
 
   getdashboarddata() {
  const studentId = localStorage.getItem('userid') || '';
  const token = localStorage.getItem('token') || '';

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  const params = new HttpParams()
    .set('StudentId', studentId)
    .set('_', Math.random().toString()); // cache buster

  return this.http.get<any>(`${this.baseurl}api/GetDashboard`, {
    headers: headers,
    params: params,
    withCredentials: false
  });
}
}
