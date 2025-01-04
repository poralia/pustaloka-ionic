import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ReadingChallengeState } from '../state/reducers/reading-challenge/reading-challenge.reducer';
import { ICreateChallenge, ICreateReading, IPostFilter, ISubmitBook, IUpdateReading } from '../reading-challege.interface';
import { ReadingChallengeActions } from '../state/actions/reading-challenge/reading-challenge.actions';
import { Observable } from 'rxjs';
import * as ChallengeSelectors from '../state/selectors/reading-challenge/reading-challenge.selectors';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(
    private store: Store<ReadingChallengeState>,
  ) { }

  /**
   * Submit book
   */
  submitBook(payload: ISubmitBook): void {
    this.store.dispatch(ReadingChallengeActions.submitBook({ payload: payload }));
  }

  /**
   * Update book
   */
  updateBook(pid: number | string, challengeId: number | string, payload: ISubmitBook): void {
    this.store.dispatch(ReadingChallengeActions.updateBook({ pid: pid, challengeId: challengeId, payload: payload }));
  }

  /**
   * Delete book
   */
  deleteBook(pid: number | string, challengeId: number | string): void {
    this.store.dispatch(ReadingChallengeActions.deleteBook({ pid: pid, challengeId: challengeId }));
  }

  /**
   * Create challenge
   */
  createChallenge(payload: ICreateChallenge): void {
    this.store.dispatch(ReadingChallengeActions.createChallenge({ payload: payload }));
  }

  /**
   * Update challenge
   */
  updateChallenge(pid: number | string, payload: ICreateChallenge): void {
    this.store.dispatch(ReadingChallengeActions.updateChallenge({ pid: pid, payload: payload }));
  }

  /**
   * Delete challenge
   */
  deleteChallenge(pid: number | string): void {
    this.store.dispatch(ReadingChallengeActions.deleteChallenge({ pid: pid }));
  }

  /**
   * Retrieve challenge
   */
  retrieveChallenge(pid: number): void {
    this.store.dispatch(ReadingChallengeActions.retrieveChallenge({ pid: pid }));
  }

  /**
   * Select challenge
   */
  selectChallenge(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.challege));
  }

  /**
   * Retrieve other challenge
   */
  retrieveOtherChallenge(pid: number): void {
    this.store.dispatch(ReadingChallengeActions.retrieveOtherChallenge({ pid: pid }));
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
    this.store.dispatch(ReadingChallengeActions.getChallenges({ filter: filter }));
  }

  /**
   * Select challenges
   */
  selectChallenges(): Observable<any> {
    return this.store.pipe(select(ChallengeSelectors.challeges));
  }

  /**
   * Get other challenges
   */
  getOtherChallenges(filter: IPostFilter): void {
    this.store.dispatch(ReadingChallengeActions.getOtherChallenges({ filter: filter }));
  }

  /**
   * Load more other challenges
   */
  loadMoreOtherChallenges(filter: IPostFilter): void {
    this.store.dispatch(ReadingChallengeActions.loadMoreOtherChallenges({ filter: filter }));
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
    this.store.dispatch(ReadingChallengeActions.createReading({ payload: payload }));
  }

  /**
   * Retrieve reading
   */
  retrieveReading(pid: number): void {
    this.store.dispatch(ReadingChallengeActions.retrieveReading({ pid: pid }));
  }

  /**
   * Get readings
   */
  getReadings(filter: IPostFilter, extra?: any): void {
    this.store.dispatch(ReadingChallengeActions.getReadings({ filter: filter, extra: extra }));
  }

  /**
   * Update reading
   */
  updateReading(pid: number, data: IUpdateReading): void {
    this.store.dispatch(ReadingChallengeActions.updateReading({ 
      pid: pid, 
      payload: data,
    }));
  }

  /**
   * Delete reading
   */
  deleteReading(pid: number, extra?: any): void {
    this.store.dispatch(ReadingChallengeActions.deleteReading({ pid: pid, extra: extra }));
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
   * Upload media
   */
  uploadMedia(pid: string | number, file: File) {
    return this.store.dispatch(ReadingChallengeActions.uploadMedia({ pid: pid, file: file }));
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
    this.store.dispatch(ReadingChallengeActions.clearMedia());
  }

  /**
   * Retrieve book
   */
  retrieveBook(pid: number): void {
    this.store.dispatch(ReadingChallengeActions.retrieveBook({ pid: pid }));
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
    this.store.dispatch(ReadingChallengeActions.getTags({ filter: filter }));
  }

}
