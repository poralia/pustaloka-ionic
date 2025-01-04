import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activation-screen',
  templateUrl: './activation-screen.component.html',
  styleUrls: ['./activation-screen.component.scss'],
  standalone: false,
})
export class ActivationScreenComponent  implements OnInit {

  public email: string | null = this.rotue.snapshot.queryParamMap.get('user_email');

  constructor(
    private rotue: ActivatedRoute,
  ) { }

  ngOnInit() {}

}
