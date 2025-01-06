import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ActionsSubject } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IRegister } from '../../interfaces';

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
    private actionsSubject$: ActionsSubject,
  ) { 
    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case '[Auth] Check OAuth Failure':
          const statusCode = action.error.status;
          const payload: any = action.payload;
 
          // do registration
          if (statusCode === 404) {
            const password = (payload?.result?.profile?.id as string) + Date.now();
            const data: IRegister = {
              google_access_token: payload.result.accessToken?.token,
              google_id_token: payload.result.idToken as string,
              google_profile_id: payload.result.profile.id as string,
              user_email: payload.result.profile.email as string,
              display_name: payload.result.profile.name as string,
              context: 'edit',
              password: password,
              signup_field_data: [
                {
                  field_id: 1,
                  value: payload.result.profile.name as string,
                }
              ],
            }
      
            this.authService.register(data);
          }
          break
      }
    })
  }

  ngOnInit() {}

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

}
