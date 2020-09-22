import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { User, UserService } from '../services/user.service';
import { UserModalPage } from '../user-modal/user-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  users: User[];

  constructor(
    private service: UserService, 
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

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

  addUser(){
    this.modalCtrl.create({
      component: UserModalPage
    }).then(modal => {
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role}) => {
      if(role === 'created'){
        this.users.push(data);
      }
    });
  }

  editUser(user: User){
    this.modalCtrl.create({
      component: UserModalPage,
      componentProps: {user}
    }).then(modal=>{
      modal.present();
      return modal.onDidDismiss();
    }).then(({data, role})=>{
      this.users = this.users.filter(usr=>{
        if(data.id === usr.id){
          return data;
        }
        return usr;
      });
    });
  }
}
