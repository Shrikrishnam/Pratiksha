
import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import {  FormGroup } from "@angular/forms";
import { UserService } from '../_services/user.service';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
    
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  
  @Output() fitnessdata = new EventEmitter<Fitness>();
 
  fitnessForm: FormGroup;
  public obj: any = {};
  isedit= false;
  allUser: Object;
  id:number;
  
  constructor(private  userService: UserService,private fb: FormBuilder,private route:ActivatedRoute,private router:Router) { }
  
  
  ngOnInit() {
    this.fitnessForm = this.fb.group({
        firstname: ["", [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
        lastname: ["", [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
        age:["",[Validators.required,Validators.min(19),Validators.max(59)]],
        phonenumber:["", [Validators.required,Validators.pattern('^[0-9]*$')]], 
        email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
        streetaddress: ["", [Validators.required]],
        city: ["", [Validators.required]],
        state: ["", [Validators.required]],
        country: ["", [Validators.required]],
        pincode: ["", [Validators.required,Validators.pattern('^[0-9]{6}$')]],
        trainerpreference: ["", [Validators.required]],
        physiotherapist: ["", [Validators.required]],
        packages: ["", [Validators.required]],
        inr: ["", [Validators.required,Validators.pattern('^[0-9]*$')]],
        paisa: ["", [Validators.required,Validators.pattern('^[0-9]*$')]],
        
     
    });
    this.fitnessForm.controls['packages'].valueChanges.subscribe((value)=>{
            this.fitnessForm.patchValue({inr:value,paisa:value*100})
    });
    //new change
      this.route.paramMap.subscribe(params=>{
      this.id=+params.get('id')
       if(this.id)
       {
        console.log(params);
        this.editfitness(params);
       }
       });
  }
  
  onSubmit() {
    this.obj = { ...this.fitnessForm.value, ...this.obj };
    this.fitnessForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.fitnessForm.value",
      this.fitnessForm.value
    );
    if (this.fitnessForm.valid){
      console.log(this.fitnessForm.value);
      this.userService.postfitnessdata(this.fitnessForm.value).subscribe((Response)=>{
        console.log("user has been added");
  
      });
      this.router.navigateByUrl("view-appointment");

    }
      
      
  }
  
   editfitness(user){
            
           this.isedit = true;
           console.log(user.get('id'));
           this.fitnessForm.setValue({firstname:user.get('firstname'),
           lastname:user.get('lastname'),
           age:user.get('age'),
           phonenumber:user.get('phonenumber'),                                  
           email:user.get('email'),
           streetaddress:user.get('streetaddress'),
           city:user.get('city'),
           state:user.get('state'),
           country:user.get('country'),
           pincode:user.get('pincode'),
           trainerpreference:user.get('trainerpreference'),
           physiotherapist:user.get('physiotherapist'),
           packages:user.get('packages'),
           inr:user.get('inr'),
           paisa:user.get('paisa')
          
   });
       
   }
   updatefitness(fitnessForm){
        this.isedit=!this.isedit;
        console.log(fitnessForm);
        this.userService.updateUser(fitnessForm,this.id).subscribe(()=>{
          this.getfitness();

        });
        this.router.navigateByUrl("view-appointment");

   }
   getfitness() {
    this.userService.getfitnessdata().subscribe((Response)=>{
         this.allUser=Response;
    });
  }

}
