import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
    standalone: false
})
export class RegisterFormComponent  implements OnInit {

  public showPassword = signal<boolean>(false);
    public formGroup: FormGroup = new FormGroup({});
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
    ) { }
  
    ngOnInit() {
      this.formGroup = this.fb.group({
        display_name: ['', [Validators.required, Validators.minLength(3)]],
        user_email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
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

      const data: IRegister = {
        context: 'edit',
        password: this.formGroup.value.password,
        user_email: this.formGroup.value.user_email,
        display_name: this.formGroup.value.display_name,
        signup_field_data: [
          {
            field_id: 1,
            value: this.formGroup.value.display_name,
          }
        ]
      }

      this.authService.register(data);
    }

}
