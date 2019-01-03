import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
items:any;
photoURL:any = 'file:///home/anish/Work/Tasks/task1/server/uploads'
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getData();
    // this.getImageURL('test')
  }

  getData(){
    this.http.get('http://localhost:3000/list').subscribe(res => {
      console.log(res)
      this.items = res;
    })
  }

  downloadFile(filename){
    this.http.post('http://localhost:3000/download',{
      filename:filename
    },{
      responseType : 'blob'}).subscribe(data => {
saveAs(data,filename)   })

  }

  getImageURL(filename){
    this.http.post('http://localhost:3000/getDownloadPath',{
      filename:filename
    },{
      responseType : 'text'}).subscribe(data => {
console.log(data)    })
  }

}
