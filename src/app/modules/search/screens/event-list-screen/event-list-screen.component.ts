import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list-screen',
  templateUrl: './event-list-screen.component.html',
  styleUrls: ['./event-list-screen.component.scss'],
  standalone: false,
})
export class EventListScreenComponent  implements OnInit {

  public events: any[] = [
    {
      id: 1,
      name: "Narabahasa: Bincang Ejaan Sastra",
      venue: "Gedung Seni Budaya Jakarta",
      date: "12 Agustus 2025",
      time: "11:00",
      cover: "https://placehold.co/600x400/png",
      price: 100000,
    },
    {
      id: 2,
      name: "Nyalanesia X Narabahasa: Menyiapkan Karya Terbaik bagi Sekolah",
      venue: "Gedung Seni Budaya Jakarta",
      date: "12 Agustus 2025",
      time: "11:00",
      cover: "https://placehold.co/600x400/png",
      print: 0,
    },
  ];

  constructor() { }

  ngOnInit() {}

}
