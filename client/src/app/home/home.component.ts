import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  propertyFormGroup: FormGroup = new FormGroup({
    propertyName: new FormControl("", [Validators.required, Validators.minLength(3)]),
    propertyDescription: new FormControl("", [Validators.required]),
    propertySize: new FormControl("", [Validators.required])
  });

  propertyId: number = 100;
  allProperty: Array<Object> = [];
  ADD_PROPERTY: string = 'Add Property';
  Hide_FORM: string = "Hide Form";
  addPropertyBtnCaption: string = this.ADD_PROPERTY;
  propertyFormVisibility: boolean = false;

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.fetchAllPropertyDataFromServer();
  }

  private fetchAllPropertyDataFromServer() {
    this.propertyService.getAllProperty().subscribe((allProperty: any)=>{
      this.allProperty = allProperty;
    }, (error)=>{
      console.log(error);
    });
  }

  propertyFormSubmit() {
    //When data is stored locally.
    // this.addNewPropertyLocally();  
    //When data is stored on server
    this.addNewPropertyOnServer();
  }

  private addNewPropertyLocally() {
    let tempProp = {
      ...this.propertyFormGroup.value,
      _id: ++this.propertyId
    }
    this.allProperty.unshift(tempProp);
  }

  private addNewPropertyOnServer() {
    const propertyDetails = this.propertyFormGroup.value;
    this.propertyService.addProperty(propertyDetails).subscribe((newProperty: any)=>{
      this.allProperty.unshift(newProperty);
      
    }, error=>{
      alert("Property not added on server. "+error);
    });
  }


  addpropertyBtnClick() {
    if(this.addPropertyBtnCaption === this.ADD_PROPERTY) {
      this.addPropertyBtnCaption = this.Hide_FORM;
      this.propertyFormVisibility = true;
    }else {
      this.addPropertyBtnCaption = this.ADD_PROPERTY;
      this.propertyFormVisibility = false;
    }
  }

  removeproperty(id: any){
    //When data is stored locally.
    //  this.removePropertyFromLocalArray(id);
     //When data is stored in server
    this.removePropertyFromServer(id);
    
  }

  private removePropertyFromServer(id) {
    this.propertyService.deleteProperty(id).subscribe((response)=>{
      this.removePropertyFromLocalArray(id);
    }, error=>{
      alert("property not delete, error: " + error);
    });
  }

  private removePropertyFromLocalArray(id) {
    const newpropertyArr = this.allProperty.filter((property: any) => property._id != id);
    this.allProperty = newpropertyArr;
  }

}
