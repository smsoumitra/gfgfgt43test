import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewVisitorComponent } from './new-visitor/new-visitor.component';
import { VisitorComponent } from './visitor/visitor.component';
import { AllVisitorsComponent } from './all-visitors/all-visitors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule } from "@angular/material";

const appRoutes: Routes = [
  {
    path: 'visitor/:id',
    component: VisitorComponent,
    data: { title: 'Visitor Details' }
  },
  {
    path: 'visitors',
    component: AllVisitorsComponent,
    data: { title: 'View Visitors' }
  },
  {
    path: 'new',
    component: NewVisitorComponent,
    data: { title: 'Visitor Details' }
  },
  { path: '',
    redirectTo: '/visitors',
    pathMatch: 'full'
}
    
]

@NgModule({
  declarations: [
    AppComponent,
    NewVisitorComponent,
    VisitorComponent,
    AllVisitorsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
