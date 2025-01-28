import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICreateActivity, IFilter } from '../../../feed.interfaces';
import { IPostFilter } from 'src/app/modules/challenge/challenge.interface';

export const FeedActions = createActionGroup({
  source: 'Feed',
  events: {
    'Load Activities': props<{ filter: IFilter }>(),
    'Load Activities Success': props<{ data: any, filter: IFilter }>(),
    'Load Activities Failure': props<{ error: HttpErrorResponse, filter: IFilter }>(),

    'Load More Activities': props<{ filter: IFilter }>(),
    'Load More Activities Success': props<{ data: any, filter: IFilter }>(),
    'Load More Activities Failure': props<{ error: HttpErrorResponse, filter: IFilter }>(),

    'Load Other Activities': props<{ filter: IFilter }>(),
    'Load Other Activities Success': props<{ data: any, filter: IFilter }>(),
    'Load Other Activities Failure': props<{ error: HttpErrorResponse, filter: IFilter }>(),

    'Load More Other Activities': props<{ filter: IFilter }>(),
    'Load More Other Activities Success': props<{ data: any, filter: IFilter }>(),
    'Load More Other Activities Failure': props<{ error: HttpErrorResponse, filter: IFilter }>(),
    
    'Retrieve Activity': props<{ pid: number }>(),
    'Retrieve Activity Success': props<{ data: any, pid: number }>(),
    'Retrieve Activity Failure': props<{ error: HttpErrorResponse, pid: number }>(),

    'Get Reading Histories': props<{ filter: IPostFilter }>(),
    'Get Reading Histories Success': props<{ data: any, filter: IPostFilter }>(),
    'Get Reading Histories Failure': props<{ error: HttpErrorResponse, filter: IPostFilter }>(),

    'Load Comments': props<{ filter: IFilter }>(),
    'Load Comments Success': props<{ data: any, filter: IFilter }>(),
    'Load Comments Failure': props<{ error: HttpErrorResponse, filter: IFilter }>(),

    'Load More Comments': props<{ filter: IFilter }>(),
    'Load More Comments Success': props<{ data: any, filter: IFilter }>(),
    'Load More Comments Failure': props<{ error: HttpErrorResponse, filter: IFilter }>(),

    'Post Comment': props<{ data: ICreateActivity }>(),
    'Post Comment Success': props<{ data: any }>(),
    'Post Comment Failure': props<{ error: HttpErrorResponse }>(),
  }
});
