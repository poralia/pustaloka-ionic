import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feed-detail-screen',
  templateUrl: './feed-detail-screen.component.html',
  styleUrls: ['./feed-detail-screen.component.scss'],
})
export class FeedDetailScreenComponent  implements OnInit {

  public pid: string | null = this.route.snapshot.paramMap.get('pid');
  public item: any = {
    id: 1,
    created_at: "12 June 2023 14:34",
    name: "Rahman",
    avatar: "https://i.pravatar.cc/150?img=3",
    book: "Dad, I Want to Hear Your Story: A Father’s Guided Journal",
    cover: "https://images-na.ssl-images-amazon.com/images/I/71sOqrd6JHL._AC_UL381_SR381,381_.jpg",
    start: "10:00",
    end: "13:50",
    duration: "1 jam 10 menit",
    page_count: 4,
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non urna sodales, dignissim erat in, porta urna. Sed luctus sapien sed sapien vulputate volutpat.',
  }

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log(this.pid);
  }

}
