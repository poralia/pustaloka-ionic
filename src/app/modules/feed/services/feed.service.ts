import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FeedState } from '../state/reducers/feed/feed.reducer';
import { FeedActions } from '../state/actions/feed/feed.actions';
import { Observable } from 'rxjs';
import * as FeedSelectors from '../state/selectors/feed/feed.selectors';
import { ICreateActivity, IFilter } from '../feed.interfaces';
import { IPostFilter } from '../../challenge/challenge.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private store: Store<FeedState>,
  ) { }

  /**
   * Load activities
   */
  loadActivities(filter: IFilter): void {
    this.store.dispatch(FeedActions.loadActivities({ filter: filter }));
  }

  /**
   * Load other activities
   */
  loadOtherActivities(filter: IFilter): void {
    this.store.dispatch(FeedActions.loadOtherActivities({ filter: filter }));
  }

  /**
   * Load more activities
   */
  loadMoreActivities(filter: IFilter): void {
    this.store.dispatch(FeedActions.loadMoreActivities({ filter: filter }));
  }

  /**
   * Load more other activities
   */
  loadMoreOtherActivities(filter: IFilter): void {
    this.store.dispatch(FeedActions.loadMoreOtherActivities({ filter: filter }));
  }

  /**
   * Retrieve activity
   */
  retrieveActivity(pid: number): void {
    this.store.dispatch(FeedActions.retrieveActivity({ pid: pid }));
  }

  /**
   * Select activities
   */
  selectActivities(): Observable<any> {
    return this.store.pipe(select(FeedSelectors.activities));
  }

  /**
   * Select other activities
   */
  selectOtherActivities(): Observable<any> {
    return this.store.pipe(select(FeedSelectors.otherActivities));
  }

  /**
   * Select activity
   */
  selectActivity(pid: number): Observable<any> {
    return this.store.pipe(select(FeedSelectors.activity(pid)));
  }

  /**
   * Get reading histories
   */
  getReadingHistories(filter: IPostFilter) {
    this.store.dispatch(FeedActions.getReadingHistories({ filter: filter }));
  }

  /**
   * Select reading histories
   */
  selectReadingHistories(): Observable<any> {
    return this.store.pipe(select(FeedSelectors.readingHistories));
  }

  /**
   * Get comments
   */
  loadComments(filter: IFilter) {
    this.store.dispatch(FeedActions.loadComments({ filter: filter }));
  }

  /**
   * Load more comments
   */
  loadMoreComments(filter: IFilter) {
    this.store.dispatch(FeedActions.loadMoreComments({ filter: filter }));
  }

  /**
   * Select comments
   */
  selectComments(): Observable<any> {
    return this.store.pipe(select(FeedSelectors.comments));
  }

  /**
   * Post comment
   */
  postComment(data: ICreateActivity) {
    this.store.dispatch(FeedActions.postComment({ data: data }));
  }

  /**
   * Mark activity as favorite / un-favorite
   */
  favorite(pid: number | string) {
    this.store.dispatch(FeedActions.markFavorite({ pid: pid }));
  }

}
