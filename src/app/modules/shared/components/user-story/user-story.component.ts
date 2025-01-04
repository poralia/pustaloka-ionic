import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.scss'],
  standalone: false,
})
export class UserStoryComponent  implements OnInit {

  public stories: any[] = [
    {
      username: 'Buat cerita',
      avatar: 'https://i.pravatar.cc/150?img=10',
    },
    {
      username: 'tuangga',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      username: 'yudishtira',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      username: 'gunung_agung',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      username: 'gramedia',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    {
      username: 'sinar_mutiara',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      username: 'salemba_toko_buku',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
  ];

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.buildSwiper();
  }

  /**
   * Build swiper
   */
  buildSwiper() {
    const swiper = new Swiper('.swiper-user-story', {
      slidesPerView: 4.5,
      breakpoints: {
        480: {
          slidesPerView: 5.5,
        },
        768: {
          slidesPerView: 7.5,
        },
        998: {
          slidesPerView: 9.5,
        }
      },
      spaceBetween: 10,
      autoHeight: false,
    });
  }

}
