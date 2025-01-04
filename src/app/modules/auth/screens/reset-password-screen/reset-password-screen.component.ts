import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password-screen',
  templateUrl: './reset-password-screen.component.html',
  styleUrls: ['./reset-password-screen.component.scss'],
  standalone: false,
})
export class ResetPasswordScreenComponent  implements OnInit {

  public email: string | null = this.route.snapshot.queryParamMap.get('user_email');
  
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {}

}
