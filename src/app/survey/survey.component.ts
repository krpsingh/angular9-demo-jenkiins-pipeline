import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

function ratingRange(min: number, max: number){
  return (data: AbstractControl): {[key: string]: boolean} |null =>{
    if(data.value !== undefined && (isNaN(data.value) || data.value < min || data.value > max)){
      return {range: true}
    }else{
      return null;
    }
  }
}

@Component({
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  surveyForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.surveyForm = this.fb.group({
          firstName:['Prashant',[Validators.required, Validators.minLength(5)]],
          email:['connect2prash@gmail.com',[Validators.required, Validators.pattern('^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,5})$')]],
          phone:[],
          notification:[],
          ratings:['3', [Validators.required, ratingRange(1,10)]]
          })
  }

  setNotification(selectedOption: string): void{    
    console.log("selectedOption"+ selectedOption); 
    const phoneControl = this.surveyForm.get('phone');
    if(selectedOption === 'phone'){
      phoneControl.setValidators(Validators.required);
    }else{
      phoneControl.clearValidators();
    }

    phoneControl.updateValueAndValidity();
  }

  save(){
    console.log("Data submitted!");
  }

  

}
