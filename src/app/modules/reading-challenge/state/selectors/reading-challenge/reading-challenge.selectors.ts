import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Statuses } from 'src/app/modules/shared/statuses.enum';
import { readingChallengeFeatureKey, ReadingChallengeState } from '../../reducers/reading-challenge/reading-challenge.reducer';

export const challengeSelectFeature = createFeatureSelector<ReadingChallengeState>(readingChallengeFeatureKey);

export const submitBook = createSelector(
    challengeSelectFeature,
    (state: ReadingChallengeState) => {
        return state.submitBook;
    }
);

export const challege = createSelector(
    challengeSelectFeature,
    (state: ReadingChallengeState) => {
        return state.challenge;
    }
);

export const challeges = createSelector(
    challengeSelectFeature,
    (state: ReadingChallengeState) => {
        return state.challenges;
    }
);

export const otherChallenge = createSelector(
    challengeSelectFeature,
    (state: ReadingChallengeState) => {
        return state.otherChallenge;
    }
);

export const otherChallenges = createSelector(
    challengeSelectFeature,
    (state: ReadingChallengeState) => {
        return state.otherChallenges;
    }
);

export const reading = createSelector(
    challengeSelectFeature,
    (state: ReadingChallengeState) => {
        return state.reading;
    }
);

export const readings = createSelector(
    challengeSelectFeature,
    (state: ReadingChallengeState) => {
        return state.readings;
    }
);

export const updateReading = createSelector(
    challengeSelectFeature,
    (state: ReadingChallengeState) => {
        return state.updateReading;
    }
);

export const uploadMedia = createSelector(
    challengeSelectFeature,
    (state: ReadingChallengeState) => {
        return state.uploadMedia;
    }
);

export const book = createSelector(
    challengeSelectFeature,
    (state: ReadingChallengeState) => {
        return state.book;
    }
);

export const tags = createSelector(
    challengeSelectFeature,
    (state: ReadingChallengeState) => {
        return state.tags;
    }
);