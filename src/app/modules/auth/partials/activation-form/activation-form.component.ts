import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-activation-form',
  templateUrl: './activation-form.component.html',
  styleUrls: ['./activation-form.component.scss'],
  standalone: false,
})
export class ActivationFormComponent  implements OnInit {

  @Input('email') email: string | null = null;
  
  public formGroup: FormGroup = new FormGroup({});
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Handler form submit
   */
  submitHandler(): void {
    console.log('Form submitted');
    this.authService.activate(this.formGroup.value.code, this.email as string);
  }

}
