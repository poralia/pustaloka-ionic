import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUpdateProfile } from '../../interfaces';

@Component({
  selector: 'app-setting-screen',
  templateUrl: './setting-screen.component.html',
  styleUrls: ['./setting-screen.component.scss'],
  standalone: false,
})
export class SettingScreenComponent  implements OnInit {

  public me$: Observable<{ data: any, statuses: string }>;
  public formGroup: FormGroup = new FormGroup({});
  public uid: string | null = null;
  public avatarFile: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private actionsSubject$: ActionsSubject,
  ) { 
    this.me$ = this.authService.selectMe();

    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case '[Auth] Retrieve Me Success':
          this.uid = action.data.id;
          this.formGroup.patchValue({
            email: action.data.email,
            name: action.data.name,
            username: action.data.mention_name,
          });
          break;
      }
    });
  }

  ngOnInit() {
    this.authService.retrieveMe();
    this.formGroup = this.fb.group({
      email: [{ value: '', disabled: true }, [Validators.email]],
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
    });
  }

  submitHandler() {
    const payload: IUpdateProfile = {
      ...this.formGroup.value,
    }

    this.authService.updateProfile('me', payload);
  }

  onUploadAvatar(event: any) {
    this.authService.uploadAvatar(this.uid, event.target.files[0]);
    event.target.value = '';
    this.avatarFile = '';
  }

  logoutHandler() {
    this.authService.logout();
  }

}
