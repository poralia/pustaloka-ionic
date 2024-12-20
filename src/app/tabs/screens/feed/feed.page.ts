import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss']
})
export class FeedPage implements OnInit {

  public pid: string | null = this.route.snapshot.paramMap.get('pid');

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    console.log(this.pid);
  }

}
