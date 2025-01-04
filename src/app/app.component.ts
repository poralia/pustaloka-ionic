import { Component } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { Platform } from '@ionic/angular';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private platform: Platform,
  ) { 
    this.platform.ready().then(() => {
      this.getMe();
      this.initializeSocialLogin();
    });
  }

  async getMe() {
    const auth = await this.authService.getAuth();
    if (auth) {
      this.authService.retrieveMe();
    }
  }

  async initializeSocialLogin() {
    await SocialLogin.initialize({
      google: {
        webClientId: environment.googleOauthClientID, // the web client id for Android and Web
      },
    });
  }

}
