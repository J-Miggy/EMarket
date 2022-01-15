import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilService } from '../util.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  [x: string]: any;
  public email: any;
  public password: any;

  constructor(
    private util: UtilService,
    private navCtrl: NavController,
  
  ) { }

  ngOnInit() {
  }

  login() {
    // Enabling Side Menu
    this.util.setMenuState(true);
    this.navCtrl.navigateRoot('/home', { animationDirection: 'forward' });

    // fireService
    this.fireService.loginWithEmail({email:this.email,password:this.password}).then(res=>{
      console.log(res);
      if(res.user.uid){
        this.fireService.getDetails({uid:res.user.uid}).subscribe(res=>{
          console.log(res);
          alert('Welcome '+ res['name']);
        },err=>{
          console.log(err);
        });
      }
    },err=>{
      alert(err.message)
      console.log(err);
    })
   
  }
  


  signup(): void{
    this.router.navigateByURL('signup');
  }
}
