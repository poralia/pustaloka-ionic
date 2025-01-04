import { Component, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../interfaces';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
    standalone: false
})
export class LoginFormComponent  implements OnInit {

  @Input('email') email: string | null = null;
  
  public showPassword = signal<boolean>(false);
  public formGroup: FormGroup = new FormGroup({});
  public isModalOpen = signal<boolean>(false);
  public resetPasswordEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this.email) {
      // fill email input
      this.formGroup.patchValue({ email: this.email });
    }
  }

  /**
   * Hide or show password
   */
  showPasswordHandler(): void {
    this.showPassword.set(!this.showPassword());
  }

  /**
   * Handler form submit
   */
  submitHandler(): void {
    console.log('Form submitted');

    const payload: ILogin = {
      username: this.formGroup.value.email,
      password: this.formGroup.value.password,
    }

    this.authService.login(payload);
  }

  setOpen(isOpen: boolean): void {
    this.isModalOpen.set(isOpen);
  }

  dismissHandler() {
    this.isModalOpen.set(false);
  }

  /**
   * Send reset password email
   */
  forgotPasswordHandler() {
    this.authService.forgotPassword(this.resetPasswordEmail);
  }

}
