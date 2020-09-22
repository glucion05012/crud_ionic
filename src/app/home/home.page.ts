import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  users: User[];

  constructor(private service: UserService, private alertCtrl: AlertController) {}

  ngOnInit(){
    this.service.getAll().subscribe(response=>{
      this.users = response;
    });
  }

  deleteUser(id: string){
    this.alertCtrl.create({
      header: "Delete",
      message: "Are you sure you want to delete user?",
      buttons: [{
        text: "Yes",
        handler: ()=> {
          this.service.delete(id).subscribe(()=>{
            this.users = this.users.filter(usr => usr.id !== id);
          });
        }
      }, {text: 'No'}
    ]
    }).then(alertEl => alertEl.present());
    
  }
}
