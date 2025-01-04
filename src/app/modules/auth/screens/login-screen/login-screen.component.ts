import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login-screen',
    templateUrl: './login-screen.component.html',
    styleUrls: ['./login-screen.component.scss'],
    standalone: false
})
export class LoginScreenComponent  implements OnInit {

  public userEmail: string | null = this.route.snapshot.queryParamMap.get('user_email');
  
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {}

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

}
