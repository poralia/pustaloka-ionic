import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { differenceInMinutes, differenceInSeconds, intervalToDuration, parseISO } from 'date-fns';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUpdateReading } from '../../challenge.interface';
import { ChallengeService } from '../../services/challenge.service';
import { IonModal } from '@ionic/angular';
import { FeedService } from 'src/app/modules/feed/services/feed.service';
import { ActionsSubject } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TZDate } from '@date-fns/tz';
import { Observable } from 'rxjs';

export interface Tag {
  label: string;
}

@Component({
    selector: 'app-summary-screen',
    templateUrl: './summary-screen.component.html',
    styleUrls: ['./summary-screen.component.scss'],
    standalone: false
})
export class SummaryScreenComponent  implements OnInit {

  @ViewChild('changeDateModal', { read: IonModal }) changeDateModal: IonModal | null = null;

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly tags = signal<Tag[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  public pid: string | null = this.route.snapshot.queryParamMap.get('pid');
  readonly title: string | null = this.route.snapshot.queryParamMap.get('title');
  readonly cover: string | null = this.route.snapshot.queryParamMap.get('bookCover');
  public fromDatetime: string | null = this.route.snapshot.queryParamMap.get('fromDatetime');
  public toDatetime: string | null = this.route.snapshot.queryParamMap.get('toDatetime');
  public fromPage: string | null = this.route.snapshot.queryParamMap.get('fromPage');
  public toPage: string | null = this.route.snapshot.queryParamMap.get('toPage');
  public isEdit: string | null = this.route.snapshot.queryParamMap.get('isEdit');
  public readingId: string | null = this.route.snapshot.queryParamMap.get('readingId');
  public duration: number = 0;
  public formGroup: FormGroup = new FormGroup({});
  public changeDateBehavior: string = 'from';
  public selectedDatetime: any;
  public newDatetime: any;
  public payload: IUpdateReading | any;
  public reading$: Observable<{ data: any, status: string }>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private challengeService: ChallengeService,
    private feedService: FeedService,
    private actionsSubject$: ActionsSubject,
  ) { 
    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case '[Feed] Retrieve Activity Success':
          const content = action.data.content.plain_text;
          if (content) {
            this.formGroup.patchValue({ content: content });
          }

          // retrieve reading
          this.challengeService.retrieveReading(action.data.secondary_item_id);
          break;
      }
    });

    this.reading$ = this.challengeService.selectReading();
  }

  ngOnInit() {
    const newPage = this.fromPage ? (parseInt(this.fromPage) + 1) as unknown as string: "1";

    this.calculateDuration();
    this.formGroup = this.fb.group({
      content: [''],
      fromPage: [this.isEdit ? this.fromPage : newPage, [Validators.required]],
      toPage: [this.toPage ? this.toPage : '', [Validators.required]],
    });

    if (this.isEdit) {
      this.feedService.retrieveActivity(this.pid as unknown as number);
    } else {
      // retrieve reading
      this.challengeService.retrieveReading(this.pid as unknown as number);
    }
  }

  calculateDuration() {
    // get duration
    this.duration = differenceInMinutes(
      this.toDatetime as string,
      this.fromDatetime as string
    );
  }

  getDuration(data: any) {
    const pauseLog = data?.meta?.pause_log;

    if (pauseLog.length > 0) {
      return this.calculatePauseDuration(pauseLog);
    } else {
      return 0;
    }
  }

  submitHandler() {
    let tags: string[] = [];
    for (let tag of this.tags()) {
      tags.push(tag.label);
    }

    this.payload = {
      content: this.formGroup.value.content,
      tags: tags,
      status: 'publish',
      meta: {
        from_page: this.formGroup.value.fromPage.toString(),
        to_page: this.formGroup.value.toPage.toString(),
        from_datetime: this.fromDatetime as string,
        to_datetime: this.toDatetime as string,
      }
    }

    // if edit pid coming from activity
    // replace it with reading id
    this.challengeService.updateReading((this.isEdit && this.readingId ? this.readingId : this.pid) as unknown as number, this.payload);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.update(tags => [...tags, {label: value}]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Tag): void {
    this.tags.update(tags => {
      const index = tags.indexOf(fruit);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Removed ${fruit.label}`);
      return [...tags];
    });
  }

  edit(fruit: Tag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    this.tags.update(tags => {
      const index = tags.indexOf(fruit);
      if (index >= 0) {
        tags[index].label = value;
        return [...tags];
      }
      return tags;
    });
  }

  dateChangeHandler(behavior: string, date: any) {
    this.changeDateBehavior = behavior;
    this.selectedDatetime = date;
    this.changeDateModal?.present();
  }

  closeChangeDateHandler() {
    this.changeDateModal?.dismiss();
  }

  dateChangedHandler(event: any) {
    this.newDatetime = new TZDate(event.detail.value, "Asia/Jakarta").toISOString();
  }

  confirmHandler() {
    this.selectedDatetime = this.newDatetime;

    if (this.changeDateBehavior == 'from') {
      // update from datetime
      this.fromDatetime = this.selectedDatetime;
      this.payload = {
        ...this.payload,
        meta: {
          ...this.payload?.meta,
          from_datetime: this.newDatetime,
        }
      }
    }

    if (this.changeDateBehavior == 'to') {
      // update to datetime
      this.toDatetime = this.selectedDatetime;
      this.payload = {
        ...this.payload,
        meta: {
          ...this.payload?.meta,
          to_datetime: this.newDatetime,
        }
      }
    }

    this.changeDateModal?.dismiss();

    setTimeout(() => {
      this.calculateDuration();
    }, 500);
  }

  /**
   * Get duration in seconds convert to minutes
   */
  calculatePauseDuration(pauseLogs: any[]): number {
    if (pauseLogs.length > 0) {
      const differences = pauseLogs.map((p: any) => {
        const fromDatetime = p[1];
        const toDatetime = p[2];
        let difference = 0;

        if (fromDatetime && toDatetime) {
          difference = differenceInSeconds(toDatetime, fromDatetime) / 60;
        }

        return Math.floor(difference);
      });

      return differences.reduce((sum: number, current: number) => sum + current, 0);
    }

    return 0;
  }

}
