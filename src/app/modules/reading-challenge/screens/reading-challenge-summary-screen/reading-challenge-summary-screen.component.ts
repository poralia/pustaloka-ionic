import { Component, inject, OnInit, signal } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-reading-challenge-summary-screen',
  templateUrl: './reading-challenge-summary-screen.component.html',
  styleUrls: ['./reading-challenge-summary-screen.component.scss'],
})
export class ReadingChallengeSummaryScreenComponent  implements OnInit {

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

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly fruits = signal<Fruit[]>([{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}]);
  readonly announcer = inject(LiveAnnouncer);

  constructor() { }

  ngOnInit() {}

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.update(fruits => [...fruits, {name: value}]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit.name}`);
      return [...fruits];
    });
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    this.fruits.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index >= 0) {
        fruits[index].name = value;
        return [...fruits];
      }
      return fruits;
    });
  }

}
