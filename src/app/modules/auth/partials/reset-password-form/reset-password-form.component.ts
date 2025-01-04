import { Component, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { IResetPassword } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  standalone: false,
})
export class ResetPasswordFormComponent  implements OnInit {

  @Input('email') email: string | null = null;

  public formGroup: FormGroup = new FormGroup({});
  public showPassword = signal<boolean>(false);
  
  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private authService: AuthService,
  ) { }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: 'danger',
      duration: 1500,
      buttons: [
        {
          text: 'Tutup',
        }
      ]
    });

    await toast.present();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      security_code: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitHandler(): void {
    const newPassword = this.formGroup.value.new_password;
    const confirmPassword = this.formGroup.value.confirm_password;

    if (newPassword !== confirmPassword) {
      this.presentToast('Konfirmasi kata sandi tidak cocok.');
    }
    else {
      const payload: IResetPassword = {
        user_email: this.email as string,
        security_code: this.formGroup.value.security_code,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }

      this.authService.resetPassword(payload);
    }
  }

  /**
   * Hide or show password
   */
  showPasswordHandler(): void {
    this.showPassword.set(!this.showPassword());
  }

}
