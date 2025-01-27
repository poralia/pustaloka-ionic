import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Statuses } from 'src/app/modules/shared/statuses.enum';
import { readingChallengeFeatureKey, ChallengeState } from '../../reducers/challenge/challenge.reducer';

export const challengeSelectFeature = createFeatureSelector<ChallengeState>(readingChallengeFeatureKey);

export const submitBook = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.submitBook;
    }
);

export const challenge = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.challenge;
    }
);

export const challenges = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.challenges;
    }
);

export const otherChallenge = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.otherChallenge;
    }
);

export const otherChallenges = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.otherChallenges;
    }
);

export const reading = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.reading;
    }
);

export const readings = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.readings;
    }
);

export const readingsDraft = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.readingsDraft;
    }
);

export const updateReading = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.updateReading;
    }
);

export const uploadMedia = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.uploadMedia;
    }
);

export const book = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.book;
    }
);

export const tags = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.tags;
    }
);

export const statsChalleges = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.stats.challenges;
    }
);


export const review = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.review;
    }
);

export const reviews = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.review;
    }
);

export const updateReview = createSelector(
    challengeSelectFeature,
    (state: ChallengeState) => {
        return state.updateReview;
    }
);