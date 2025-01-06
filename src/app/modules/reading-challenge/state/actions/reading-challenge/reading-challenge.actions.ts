import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICreateChallenge, ICreateReading, IPostFilter, ISubmitBook, IUpdateReading } from '../../../reading-challege.interface';

export const ReadingChallengeActions = createActionGroup({
  source: 'ReadingChallenge',
  events: {
    'Submit Book': props<{ payload: ISubmitBook }>(),
    'Submit Book Success': props<{ data: any, payload: ISubmitBook }>(),
    'Submit Book Failure': props<{ error: any, payload: ISubmitBook }>(),

    'Update Book': props<{ pid: string | number, challengeId?: string | number, payload: ISubmitBook }>(),
    'Update Book Success': props<{ data: any, payload: ISubmitBook, challengeId?: string | number }>(),
    'Update Book Failure': props<{ error: any, payload: ISubmitBook }>(),

    'Delete Book': props<{ pid: string | number, challengeId?: string | number }>(),
    'Delete Book Success': props<{ data: any, challengeId?: string | number }>(),
    'Delete Book Failure': props<{ error: any }>(),

    'Create Challenge': props<{ payload: ICreateChallenge }>(),
    'Create Challenge Success': props<{ data: any, payload: ICreateChallenge }>(),
    'Create Challenge Failure': props<{ error: any, payload: ICreateChallenge }>(),

    'Update Challenge': props<{ pid: string | number, payload: ICreateChallenge }>(),
    'Update Challenge Success': props<{ data: any, payload: ICreateChallenge }>(),
    'Update Challenge Failure': props<{ error: any, payload: ICreateChallenge }>(),

    'Delete Challenge': props<{ pid: string | number }>(),
    'Delete Challenge Success': props<{ data: any }>(),
    'Delete Challenge Failure': props<{ error: any }>(),

    'Retrieve Challenge': props<{ pid: number }>(),
    'Retrieve Challenge Success': props<{ data: any }>(),
    'Retrieve Challenge Failure': props<{ error: any }>(),

    'Get Challenges': props<{ filter: IPostFilter }>(),
    'Get Challenges Success': props<{ data: any, filter: IPostFilter }>(),
    'Get Challenges Failure': props<{ error: any, filter: IPostFilter }>(),

    'Retrieve Other Challenge': props<{ pid: number }>(),
    'Retrieve Other Challenge Success': props<{ data: any }>(),
    'Retrieve Other Challenge Failure': props<{ error: any }>(),

    'Get Other Challenges': props<{ filter: IPostFilter }>(),
    'Get Other Challenges Success': props<{ data: any, filter: IPostFilter }>(),
    'Get Other Challenges Failure': props<{ error: any, filter: IPostFilter }>(),

    'Load More Other Challenges': props<{ filter: IPostFilter }>(),
    'Load More Other Challenges Success': props<{ data: any, filter: IPostFilter }>(),
    'Load More Other Challenges Failure': props<{ error: any, filter: IPostFilter }>(),

    'Create Reading': props<{ payload: ICreateReading }>(),
    'Create Reading Success': props<{ data: any, payload: ICreateReading }>(),
    'Create Reading Failure': props<{ error: any, payload: ICreateReading }>(),

    'Update Reading': props<{ pid: number, payload: IUpdateReading }>(),
    'Update Reading Success': props<{ data: any, pid: number, payload: IUpdateReading }>(),
    'Update Reading Failure': props<{ error: any, pid: number, payload: IUpdateReading }>(),

    'Delete Reading': props<{ pid: number, extra?: any }>(),
    'Delete Reading Success': props<{ data: any, pid: number, extra?: any }>(),
    'Delete Reading Failure': props<{ error: any, pid: number, extra?: any }>(),

    'Retrieve Reading': props<{ pid: number }>(),
    'Retrieve Reading Success': props<{ data: any }>(),
    'Retrieve Reading Failure': props<{ error: any }>(),

    'Get Readings': props<{ filter: IPostFilter, extra?: any }>(),
    'Get Readings Success': props<{ data: any, filter: IPostFilter, extra?: any }>(),
    'Get Readings Failure': props<{ error: any, filter: IPostFilter, extra?: any }>(),

    'Load More Readings': props<{ filter: IPostFilter, extra?: any }>(),
    'Load More Readings Success': props<{ data: any, filter: IPostFilter, extra?: any }>(),
    'Load More Readings Failure': props<{ error: any, filter: IPostFilter, extra?: any }>(),

    'Upload Media': props<{ pid: string | number, file: File }>(),
    'Upload Media Success': props<{ data: any }>(),
    'Upload Media Failure': props<{ error: any }>(),

    'Clear Media': emptyProps(),

    'Retrieve Book': props<{ pid: number }>(),
    'Retrieve Book Success': props<{ data: any }>(),
    'Retrieve Book Failure': props<{ error: any }>(),

    'Get Tags': props<{ filter: IPostFilter }>(),
    'Get Tags Success': props<{ data: any, filter: IPostFilter }>(),
    'Get Tags Failure': props<{ error: any, filter: IPostFilter }>(),

    'Stats Get Challenges': props<{ filter: IPostFilter }>(),
    'Stats Get Challenges Success': props<{ data: any, filter: IPostFilter }>(),
    'Stats Get Challenges Failure': props<{ error: any, filter: IPostFilter }>(),
  }
});
