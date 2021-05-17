import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  public url = 'http://localhost:3000/api/';
  constructor(public http: HttpClient) { }
  categories = [
    {name: 'Mobile', value: 'mobile'},
    {name: 'Laptop', value: 'laptop'},
    {name: 'Watches', value: 'Watches'},
    {name: 'Accessories', value: 'accessories'},
    {name: 'Other', value: 'other'},
  ];
  noImagePath = 'assets/upload.jpg';
  getdata(urlt: any) {
    const getUrl = this.url + urlt;
    return this.http.get(getUrl);
  }
  getDataByID(urlt: any, id: any) {
    const getUrl = this.url + urlt + '/' + id;
    return this.http.get(getUrl);
  }

  deletedata(urlt: any, id: any)  {
    const deleteUrl = this.url + urlt + '/' + id;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.http.delete(deleteUrl);
  }
  deleteAlldata(urlt: any)  {
    const deleteUrl = this.url + urlt;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.http.delete(deleteUrl);
  }
  patchdata(urlT: any, data: any)  {
    const updateUrl = this.url + urlT;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.http.patch(updateUrl, data);
  }
  putdata(urlT: any, data: any) {
    const putUrl = this.url + urlT;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return this.http.put(putUrl, data);
  }
  postdata(urlT: any, data: any)  {
    const updateUrl = this.url + urlT;
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return this.http.post(updateUrl, data);
  }
}
