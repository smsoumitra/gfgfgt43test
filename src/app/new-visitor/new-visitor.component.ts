import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-new-visitor',
  templateUrl: './new-visitor.component.html',
  styleUrls: ['./new-visitor.component.css']
})
export class NewVisitorComponent implements OnInit {
  addVisitorForm: FormGroup;
  submitted = false;
  constructor(private service : ApiService) { }

  ngOnInit() {
  //   this.addVisitorForm = this.formBuilder.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]]
  // });
  this.addVisitorForm  = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(`\\+{0,1}[0-9]*`)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    occupation : new FormControl('', Validators.required),
    purpose: new FormControl('', Validators.required),
    photoId: new FormControl('', Validators.required),
    idNumber: new FormControl('', Validators.required)
  });
  }

  get f() { return this.addVisitorForm.controls; }

  onSubmit() {
    console.log(this.addVisitorForm.value);
    this.submitted = true;
    this.service.addVisitor({
      "first_name": this.addVisitorForm.value.firstName,
      "last_name": this.addVisitorForm.value.lastName,
      "contact_number": this.addVisitorForm.value.contactNumber,
      "email": this.addVisitorForm.value.email,
      "id_number": this.addVisitorForm.value.idNumber,
      "occupation": this.addVisitorForm.value.occupation,
      "purpose": this.addVisitorForm.value.purpose,
      "photo_id": this.addVisitorForm.value.photoId,
      "number_of_visits": 1
     
    }).subscribe(res => {
      console.log(res);
      //this.visitors = res;
    }, err => {
      console.log(err);
    });;
    
    // stop here if form is invalid
    if (this.addVisitorForm.invalid) {
        return;
    }

  }

  get firstName(){
    return this.addVisitorForm.get('firstName');
  }

  get lastName(){
    return this.addVisitorForm.get('lastName');
  }

  get contactNumber(){
    return this.addVisitorForm.get('contactNumber');
  }

  get email(){
    return this.addVisitorForm.get('email');
  }

  get occupation(){
    return this.addVisitorForm.get('email');
  }

  get purpose(){
    return this.addVisitorForm.get('email');
  }

  get photoId(){
    return this.addVisitorForm.get('photoId');
  }

  get idNumber(){
    return this.addVisitorForm.get('photoId');
  }

}
