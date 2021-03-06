import {NavController, AlertController, ViewController} from 'ionic-angular';
import {Component} from '@angular/core';
import {UserData} from '../../providers/user-data';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/account/account.html',
})
export class AccountPage {
  username: string;

  constructor(private nav: NavController, private userData: UserData, private alertCtrl: AlertController, private viewCtrl: ViewController) {

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.nav.setRoot(LoginPage);
  }
}
