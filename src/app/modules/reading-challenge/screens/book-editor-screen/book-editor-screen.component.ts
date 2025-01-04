import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ISubmitBook } from '../../reading-challege.interface';
import { ChallengeService } from '../../services/challenge.service';
import { Observable } from 'rxjs';
import { ActionsSubject } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface Author {
  name: string
}

@Component({
  selector: 'app-book-editor-screen',
  templateUrl: './book-editor-screen.component.html',
  styleUrls: ['./book-editor-screen.component.scss'],
  standalone: false,
})
export class BookEditorScreenComponent  implements OnInit {

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly authors = signal<Author[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  public formGroup: FormGroup = new FormGroup({});
  public file: File | null = null;
  public featuredMedia: number | null = null;
  public featuredMediaUrl: string | null = null;
  public pid: string | null = this.route.snapshot.paramMap.get('pid');
  public challengeId: string | null = this.route.snapshot.queryParamMap.get('challengeId');

  public uploadMedia$: Observable<{ data: any, status: string }>;
    
  constructor(
    private fb: FormBuilder,
    private challengeService: ChallengeService,
    private actionsSubject$: ActionsSubject,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
  ) { 
    this.uploadMedia$ = this.challengeService.selectUploadMedia();

    // listen state
    this.actionsSubject$.pipe(takeUntilDestroyed()).subscribe((action: any) => {
      switch (action.type) {
        case '[ReadingChallenge] Upload Media Success':
          this.featuredMedia = action.data.id;
          break;
        case '[ReadingChallenge] Retrieve Book Success':
          this.featuredMedia = action.data.featured_media;
          this.featuredMediaUrl = action.data.featured_media_url;

          const bookAuthor = action.data.book_author_raw.map((item: any) => item.name).join(' - ');
          this.formGroup.patchValue({
            title: action.data.title.rendered,
            book_author: bookAuthor,
            number_of_pages: action.data.meta.number_of_pages,
          });
          break;
      }
    });
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      book_author: ['', [Validators.required, Validators.minLength(5)]],
      number_of_pages: ['', [Validators.required, Validators.minLength(1)]],
    });

    if (this.pid) {
      // load book entity
      this.challengeService.retrieveBook(this.pid as unknown as number);
    }
  }

  /**
   * Submit handler
   */
  submitHandler() {
    const payload: ISubmitBook = {
      title: this.formGroup.value.title,
      book_author: this.formGroup.value.book_author.split('-'),
      featured_media: this.featuredMedia as number,
      meta: {
        number_of_pages: this.formGroup.value.number_of_pages,
      }
    }

    if (this.pid && this.challengeId) {
      this.challengeService.updateBook(this.pid, this.challengeId, payload);
    } else {
      this.challengeService.submitBook(payload);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our item
    if (value) {
      this.authors.update(authors => [...authors, {name: value}]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(item: Author): void {
    this.authors.update(authors => {
      const index = authors.indexOf(item);
      if (index < 0) {
        return authors;
      }

      authors.splice(index, 1);
      this.announcer.announce(`Removed ${item.name}`);
      return [...authors];
    });
  }

  edit(item: Author, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove item if it no longer has a name
    if (!value) {
      this.remove(item);
      return;
    }

    // Edit existing item
    this.authors.update(authors => {
      const index = authors.indexOf(item);
      if (index >= 0) {
        authors[index].name = value;
        return [...authors];
      }
      return authors;
    });
  }

  /**
   * File selected
   */
  fileSelectedHandler(event: any) {
    this.challengeService.uploadMedia(1, event.target.files[0]);
    // clear after selected
    event.target.value = '';
  }

  async deleteChallengeHandler(pid: any) {
    const alrt = await this.alertCtrl.create({
      header: 'Informasi',
      message: 'Yakin ingin menghapus buku ini selamanya?',
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Ya, Hapus!',
          role: 'destructive',
          handler: () => {
            this.challengeService.deleteChallenge(pid);
          }
        }
      ],
    });

    await alrt.present();
  }

}
