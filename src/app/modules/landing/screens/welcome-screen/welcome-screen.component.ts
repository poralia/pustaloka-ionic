import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss'],
  standalone: false,
})
export class WelcomeScreenComponent  implements OnInit {

  public isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.checkAuthenticated();
  }

  async checkAuthenticated() {
    const auth = await this.authService.getAuth();
    if (auth) {
      this.isAuthenticated = true;

      setTimeout(() => {
        this.router.navigate(['/tabs/feed'], { replaceUrl: true });
      }, 0);
    }
  }

}
