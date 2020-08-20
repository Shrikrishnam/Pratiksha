import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls:['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {

  allUser: Object;
  userObj={

  }
  
  constructor(private  userService: UserService,private router:Router) { }
      
   ngOnInit() {
     this.getfitness();
  }
  
  getfitness() {
    this.userService.getfitnessdata().subscribe((Response)=>{
         this.allUser=Response;
    },
    (err) => {
      console.log(err);
    });
  }
  editUser(user){
    //new change
    this.router.navigate(["/place-fitness-trainer-appointment",user]);
  }
  deleteUser(user){
    const decesionToDeleteAppoinment = confirm("Delete appointment ?");
    if(decesionToDeleteAppoinment){
      this.userService.deleteUser(user).subscribe(()=>{
        this.getfitness();
      });
    }
    else{
      alert("Cancel delete");
    }
      
  }
  
}
