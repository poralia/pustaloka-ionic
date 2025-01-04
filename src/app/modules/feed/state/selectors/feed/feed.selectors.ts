import { createFeatureSelector, createSelector } from '@ngrx/store';
import { feedFeatureKey, FeedState } from '../../reducers/feed/feed.reducer';
import { Statuses } from 'src/app/modules/shared/statuses.enum';

export const feedSelectFeature = createFeatureSelector<FeedState>(feedFeatureKey);

export const activities = createSelector(
    feedSelectFeature,
    (state: FeedState) => {
        return state.activities;
    }
);

export const activity = (pid: number) => createSelector(
    feedSelectFeature,
    (state: FeedState) => {
        let activity = state.activities.data?.find((item: any) => item.id == pid);
        if (activity) {
            activity = {
                data: activity,
                status: Statuses.SUCCESS,
                error: null,
            }
        }
        else {
            activity = state.activity;
        }

        return state.activity;
    }
);

export const readingHistories = createSelector(
    feedSelectFeature,
    (state: FeedState) => {
        return state.readingHistories;
    }
);

export const comments = createSelector(
    feedSelectFeature,
    (state: FeedState) => {
        return state.comments;
    }
);