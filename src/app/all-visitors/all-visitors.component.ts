import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {PageEvent} from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-all-visitors',
  templateUrl: './all-visitors.component.html',
  styleUrls: ['./all-visitors.component.css']
})
export class AllVisitorsComponent implements OnInit {
  visitors: any;
  displayedColumns = ['full_name', 'email', 'contact_number', 'purpose', 'visit_date'];
  //dataSource = new VisitorsDataSource(this.api);
  datasource = this.visitors;
  timeOut;
  // MatPaginator Inputs
  dataOptions = {
    recordsLength : 0,
    pageSize : 10,
    pageIndex : 0,
    pageSizeOptions : [5, 10, 25, 100],
    sortColumns : ['first_name', 'last_name'],
    sortOrder : true,
    searchString : "" 
  }
  

  // MatPaginator Output
  pageEvent: PageEvent;
  constructor(private api: ApiService) { }

  ngOnInit() { 
    this.callVisitors();
  }
  search(){
    if(this.timeOut){
      clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(()=>{
      //Search for Visitors
      this.callVisitors(); 
    }, 500);
  }
  onPaginateChange(event){
    this.dataOptions.pageSize = event.pageSize;
    this.dataOptions.pageIndex = event.pageIndex;
    this.api.getVisitors(this.dataOptions.sortColumns, this.dataOptions.sortOrder, event.pageSize*event.pageIndex+1, event.pageSize, this.dataOptions.searchString)
    .subscribe(res => {
      console.log(23);
      this.highlightSearch(res);
      //this.visitors = res;
    }, err => {
      console.log(err);
    });
  }

  highlightSearch(res){
    console.log(this.dataOptions);
    let keys;
    for(let visitor in res){
      keys = keys || Object.keys(res[visitor]);
      for(let k in keys){
        console.log(res[visitor],"--------" ,keys[k], "-------", res[visitor][keys[k]])
        if(!keys[k].startsWith("_")){
          let val = res[visitor][keys[k]].toString();
          let index = val.toLowerCase().indexOf(this.dataOptions.searchString.toLowerCase());
          let splitArr;
          if (this.dataOptions.searchString.length > 0 && index > -1) { 
            splitArr = [val.substring(0,index),  val.substring(index,index+this.dataOptions.searchString.length), val.substring(index + this.dataOptions.searchString.length)];
            console.log(splitArr);
           } else {
            splitArr = [val, "", ""];
          }
          res[visitor][keys[k]] = splitArr
        }
      }
    }

    this.visitors = res;
  }


  sortData(event){
    this.dataOptions.sortColumns = (event.active === "full_name") ? ['first_name', 'last_name'] : [event.active];
    this.dataOptions.sortOrder = (event.direction === "asc") ? true : false;
    this.callVisitors();
    // this.onPaginateChange({
    //   length :this.dataOptions.recordsLength,
    //   pageIndex :this.dataOptions.pageIndex,
    //   pageSize : this.dataOptions.pageSize,
    //   previousPageIndex : 0,
    // });
  }

  callVisitors(){
    this.api.getVisitorsCount(this.dataOptions.searchString)
    .subscribe(res => {
      console.log(2323232, "------", res);
      this.dataOptions.recordsLength = +res;
      this.onPaginateChange({
        //length : recordsLength || this.dataOptions.recordsLength,
        pageIndex : this.dataOptions.pageIndex,
        pageSize : this.dataOptions.pageSize
      });
    }, err => {
      console.log(err);
    });
    
  }
  
 

}

// export class VisitorsDataSource extends DataSource<any> {
//   constructor(private api: ApiService){
//     super();
//   }

//   connect() {
//     return this.api.getVisitors();
//   }
//   disconnect(){}
// }
