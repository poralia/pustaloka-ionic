import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-list-screen',
  templateUrl: './feed-list-screen.component.html',
  styleUrls: ['./feed-list-screen.component.scss'],
})
export class FeedListScreenComponent  implements OnInit {

  public items: any = [
    {
      id: 1,
      created_at: "12 June 2023 14:34",
      name: "Rahman",
      avatar: "https://i.pravatar.cc/150?img=3",
      book: "Belajar Python dan Java",
      cover: "https://images-na.ssl-images-amazon.com/images/I/71sOqrd6JHL._AC_UL381_SR381,381_.jpg",
      start: "10:00",
      end: "13:50",
      duration: "1 jam 10 menit",
      page_count: 4,
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non urna sodales, dignissim erat in, porta urna. Sed luctus sapien sed sapien vulputate volutpat.',
    },
    {
      id: 2,
      created_at: "12 June 2023 14:34",
      name: "Jennifer Debora",
      avatar: "https://i.pravatar.cc/150?img=5",
      book: "Psikologi Pekerjaan",
      cover: "https://images-na.ssl-images-amazon.com/images/I/81fjEcQkTuL._AC_UL381_SR381,381_.jpg",
      start: "10:00",
      end: "13:50",
      duration: "2 jam 24 menit",
      page_count: 4,
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non urna sodales, dignissim erat in, porta urna. Sed luctus sapien sed sapien vulputate volutpat.',
    },
    {
      id: 3,
      created_at: "12 June 2023 14:34",
      name: "Ahmad Taftazani",
      avatar: "https://i.pravatar.cc/150?img=15",
      book: "Dad, I Want to Hear Your Story: A Father’s Guided Journal",
      cover: "https://images-na.ssl-images-amazon.com/images/I/51+ROKEYviL._AC_UL381_SR381,381_.jpg",
      start: "10:00",
      end: "13:50",
      duration: "0 jam 24 menit",
      page_count: 2,
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non urna sodales, dignissim erat in, porta urna. Sed luctus sapien sed sapien vulputate volutpat.',
    }
  ];

  constructor() { }

  ngOnInit() {}

}
