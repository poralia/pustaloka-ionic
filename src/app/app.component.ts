import { Component } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: false
})
export class AppComponent {

  constructor(
    private authService: AuthService,
  ) { 
    this.getMe();
  }

  async getMe() {
    const auth = await this.authService.getAuth();
    if (auth) {
      this.authService.retrieveMe();
    }
  }

}
