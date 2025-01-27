import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ChallengeState } from '../state/reducers/challenge/challenge.reducer';
import { ICreateChallenge, ICreateReading, ICreateReview, IPostFilter, ISubmitBook, IUpdateReading } from '../challenge.interface';
import { ChallengeActions } from '../state/actions/challenge/challenge.actions';
import { Observable } from 'rxjs';
import * as ChallengeSelectors from '../state/selectors/challenge/challenge.selectors';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(
    private store: Store<ChallengeState>,
  ) { }

  /**
   * Submit book
   */
  submitBook(payload: ISubmitBook): void {
    this.store.dispatch(ChallengeActions.submitBook({ payload: payload }));
  }

  /**
   * Update book
   */
  updateBook(pid: number | string, challengeId: number | string, payload: ISubmitBook): void {
    this.store.dispatch(ChallengeActions.updateBook({ pid: pid, challengeId: challengeId, payload: payload }));
  }

  /**
   * Delete book
   */
  deleteBook(pid: number | string, challengeId: number | string): void {
    this.store.dispatch(ChallengeActions.deleteBook({ pid: pid, challengeId: challengeId }));
  }

  /**
   * Create challenge
   */
  createChallenge(payload: ICreateChallenge): void {
    this.store.dispatch(ChallengeActions.createChallenge({ payload: payload }));
  }

  /**
   * Update challenge
   */
  updateChallenge(pid: number | string, payload: ICreateChallenge): void {
    this.store.dispatch(ChallengeActions.updateChallenge({ pid: pid, payload: payload }));
  }

  /**
   * Delete challenge
   */
  deleteChallenge(pid: number | string): void {
    this.store.dispatch(ChallengeActions.deleteChallenge({ pid: pid }));
  }

  /**
   * Retrieve challenge
   */
  retrieveChallenge(pid: number): void {
    this.store.dispatch(ChallengeActions.retrieveChallenge({ pid: pid }));
  }

  /**
   * Select challenge
   */
  selectChallenge(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.challenge));
  }

  /**
   * Retrieve other challenge
   */
  retrieveOtherChallenge(pid: number): void {
    this.store.dispatch(ChallengeActions.retrieveOtherChallenge({ pid: pid }));
  }

  /**
   * Select other challenge
   */
  selectOtherChallenge(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.otherChallenge));
  }

  /**
   * Get challenges
   */
  getChallenges(filter: IPostFilter): void {
    this.store.dispatch(ChallengeActions.getChallenges({ filter: filter }));
  }

  /**
   * Select challenges
   */
  selectChallenges(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.challenges));
  }

  /**
   * Get other challenges
   */
  getOtherChallenges(filter: IPostFilter): void {
    this.store.dispatch(ChallengeActions.getOtherChallenges({ filter: filter }));
  }

  /**
   * Load more other challenges
   */
  loadMoreOtherChallenges(filter: IPostFilter): void {
    this.store.dispatch(ChallengeActions.loadMoreOtherChallenges({ filter: filter }));
  }

  /**
   * Select Other challenges
   */
  selectOtherChallenges(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.otherChallenges));
  }

  /**
   * Create reading
   */
  createReading(payload: ICreateReading): void {
    this.store.dispatch(ChallengeActions.createReading({ payload: payload }));
  }

  /**
   * Retrieve reading
   */
  retrieveReading(pid: number): void {
    this.store.dispatch(ChallengeActions.retrieveReading({ pid: pid }));
  }

  /**
   * Get readings
   */
  getReadings(filter: IPostFilter, extra?: any): void {
    this.store.dispatch(ChallengeActions.getReadings({ filter: filter, extra: extra }));
  }

  /**
   * Load more readings
   */
  loadMoreReadings(filter: IPostFilter, extra?: any): void {
    this.store.dispatch(ChallengeActions.loadMoreReadings({ filter: filter, extra: extra }));
  }

  /**
   * Get readings draft
   */
  getReadingsDraft(filter: IPostFilter, extra?: any): void {
    this.store.dispatch(ChallengeActions.getReadingsDraft({ filter: filter, extra: extra }));
  }

  /**
   * Update reading
   */
  updateReading(pid: number, data: IUpdateReading, extra?: any): void {
    this.store.dispatch(ChallengeActions.updateReading({ 
      pid: pid, 
      payload: data,
      extra: extra,
    }));
  }

  /**
   * Delete reading
   */
  deleteReading(pid: number, extra?: any): void {
    this.store.dispatch(ChallengeActions.deleteReading({ pid: pid, extra: extra }));
  }

  /**
   * Select reading
   */
  selectReading(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.reading));
  }

  /**
   * Select readings
   */
  selectReadings(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.readings));
  }

  /**
   * Select readings draft
   */
  selectReadingsDraft(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.readingsDraft));
  }

  /**
   * Upload media
   */
  uploadMedia(pid: string | number, file: File) {
    return this.store.dispatch(ChallengeActions.uploadMedia({ pid: pid, file: file }));
  }

  /**
   * Select media
   */
  selectUploadMedia(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.uploadMedia));
  }

  /**
   * Clear media
   */
  clearMedia(): void {
    this.store.dispatch(ChallengeActions.clearMedia());
  }

  /**
   * Retrieve book
   */
  retrieveBook(pid: number): void {
    this.store.dispatch(ChallengeActions.retrieveBook({ pid: pid }));
  }

  /**
   * Select book
   */
  selectBook(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.book));
  }

  /**
   * Select tags
   */
  selectTags(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.tags));
  }

  /**
   * Get tags
   */
  getTags(filter: IPostFilter): void {
    this.store.dispatch(ChallengeActions.getTags({ filter: filter }));
  }

  /**
   * Get Stats challenges
   */
  statsGetChallenges(filter: IPostFilter): void {
    this.store.dispatch(ChallengeActions.statsGetChallenges({ filter: filter }));
  }

  /**
   * Stats Select challenges
   */
  selectStatsChallenges(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.statsChalleges));
  }



  /**
   * Create review
   */
  createReview(payload: ICreateReview): void {
    this.store.dispatch(ChallengeActions.createReview({ payload: payload }));
  }

  /**
   * Retrieve review
   */
  retrieveReview(pid: number): void {
    this.store.dispatch(ChallengeActions.retrieveReview({ pid: pid }));
  }

  /**
   * Get reviews
   */
  getReviews(filter: IPostFilter, extra?: any): void {
    this.store.dispatch(ChallengeActions.getReviews({ filter: filter, extra: extra }));
  }

  /**
   * Load more reviews
   */
  loadMoreReviews(filter: IPostFilter, extra?: any): void {
    this.store.dispatch(ChallengeActions.loadMoreReviews({ filter: filter, extra: extra }));
  }

  /**
   * Update review
   */
  updateReview(pid: number, data: ICreateReview): void {
    this.store.dispatch(ChallengeActions.updateReview({ 
      pid: pid, 
      payload: data,
    }));
  }

  /**
   * Delete review
   */
  deleteReview(pid: number, extra?: any): void {
    this.store.dispatch(ChallengeActions.deleteReview({ pid: pid, extra: extra }));
  }

  /**
   * Select review
   */
  selectReview(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.review));
  }

  /**
   * Select reviews
   */
  selectReviews(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.reviews));
  }

}
