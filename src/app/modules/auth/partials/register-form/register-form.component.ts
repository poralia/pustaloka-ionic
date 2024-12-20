import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    ) { }
  
    ngOnInit() {
      this.formGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
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
