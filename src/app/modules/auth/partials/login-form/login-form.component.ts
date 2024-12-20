import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  public showPassword = signal<boolean>(false);
  public formGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    console.log(this.formGroup.value);
  }

}
