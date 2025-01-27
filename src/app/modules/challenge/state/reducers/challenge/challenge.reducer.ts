import { createReducer, on } from '@ngrx/store';
import { ChallengeActions } from '../../actions/challenge/challenge.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Statuses } from 'src/app/modules/shared/statuses.enum';

export const readingChallengeFeatureKey = 'readingChallenge';

export interface ChallengeState {
  submitBook: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  }
  challenge: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  challenges: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  otherChallenge: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  otherChallenges: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  reading: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  readings: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  readingsDraft: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  updateReading: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  deleteReading: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  review: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  reviews: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  updateReview: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  deleteReview: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  uploadMedia: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  book: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  tags: {
    data: any
    status: string
    error: HttpErrorResponse | null,
  },
  stats: {
    challenges: {
      data: any
      status: string
      error: HttpErrorResponse | null,
    }
  }
}

export const initialState: ChallengeState = {
  submitBook: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  challenge: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  challenges: {
    data: [],
    status: Statuses.IDLE,
    error: null,
  },
  otherChallenge: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  otherChallenges: {
    data: [],
    status: Statuses.IDLE,
    error: null,
  },
  reading: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  deleteReading: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  readings: {
    data: [],
    status: Statuses.IDLE,
    error: null,
  },
  readingsDraft: {
    data: [],
    status: Statuses.IDLE,
    error: null,
  },
  updateReading: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  review: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  deleteReview: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  reviews: {
    data: [],
    status: Statuses.IDLE,
    error: null,
  },
  updateReview: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  uploadMedia: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  book: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  tags: {
    data: [],
    status: Statuses.IDLE,
    error: null,
  },
  stats: {
    challenges: {
      data: [],
      status: Statuses.IDLE,
      error: null,
    }
  }
};

export const ChallengeReducer = createReducer(
  initialState,

  // ...
  // SUBMIT BOOK
  // ...
  on(ChallengeActions.submitBook, (state, { payload }) => {
    return {
      ...state,
      submitBook: {
        ...state.submitBook,
        data: payload,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.submitBookSuccess, (state, { data }) => {
    return {
      ...state,
      submitBook: {
        ...state.submitBook,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.submitBookFailure, (state, { error }) => {
    return {
      ...state,
      submitBook: {
        ...state.submitBook,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // CREATE READING
  // ...
  on(ChallengeActions.createReading, (state, { payload }) => {
    return {
      ...state,
      reading: {
        ...state.reading,
        data: payload,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.createReadingSuccess, (state, { data }) => {
    return {
      ...state,
      reading: {
        ...state.reading,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.createReadingFailure, (state, { error }) => {
    return {
      ...state,
      reading: {
        ...state.reading,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // RETRIEVE READING
  // ...
  on(ChallengeActions.retrieveReading, (state, { pid }) => {
    return {
      ...state,
      reading: {
        ...state.reading,
        data: pid,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.retrieveReadingSuccess, (state, { data }) => {
    return {
      ...state,
      reading: {
        ...state.reading,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.retrieveReadingFailure, (state, { error }) => {
    return {
      ...state,
      reading: {
        ...state.reading,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // UPDATE READING
  // ...
  on(ChallengeActions.updateReading, (state, { payload }) => {
    return {
      ...state,
      updateReading: {
        ...state.updateReading,
        data: payload,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.updateReadingSuccess, (state, { data }) => {
    return {
      ...state,
      updateReading: {
        ...state.updateReading,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.updateReadingFailure, (state, { error }) => {
    return {
      ...state,
      updateReading: {
        ...state.updateReading,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // DELETE READING
  // ...
  on(ChallengeActions.deleteReading, (state) => {
    return {
      ...state,
      deleteReading: {
        ...state.deleteReading,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.deleteReadingSuccess, (state, { data, pid }) => {
    return {
      ...state,
      deleteReading: {
        ...state.deleteReading,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      },
      reading: initialState.reading,
      readings: {
        ...state.readings,
        data: state.readings.data.filter((item: any) => item.id != pid),
      }
    }
  }),
  on(ChallengeActions.deleteReadingFailure, (state, { error }) => {
    return {
      ...state,
      deleteReading: {
        ...state.deleteReading,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // GET READINGS
  // ...
  on(ChallengeActions.getReadings, (state) => {
    return {
      ...state,
      readings: {
        ...state.readings,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.getReadingsSuccess, (state, { data }) => {
    return {
      ...state,
      readings: {
        ...state.readings,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.getReadingsFailure, (state, { error }) => {
    return {
      ...state,
      readings: {
        ...state.readings,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // GET READINGS DRAFT
  // ...
  on(ChallengeActions.getReadingsDraft, (state) => {
    return {
      ...state,
      readingsDraft: {
        ...state.readingsDraft,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.getReadingsDraftSuccess, (state, { data }) => {
    return {
      ...state,
      readingsDraft: {
        ...state.readingsDraft,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.getReadingsDraftFailure, (state, { error }) => {
    return {
      ...state,
      readingsDraft: {
        ...state.readingsDraft,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // LOAD MORE READINGS
  // ...
  on(ChallengeActions.loadMoreReadings, (state) => {
    return {
      ...state,
      readings: {
        ...state.readings,
        error: null,
      }
    }
  }),
  on(ChallengeActions.loadMoreReadingsSuccess, (state, { data }) => {
    return {
      ...state,
      readings: {
        ...state.readings,
        data: [
          ...state.readings.data,
          ...data,
        ],
        error: null,
      }
    }
  }),
  on(ChallengeActions.loadMoreReadingsFailure, (state, { error }) => {
    return {
      ...state,
      readings: {
        ...state.readings,
        error: error,
      }
    }
  }),


  // ...
  // CREATE CHALLENGE
  // ...
  on(ChallengeActions.createChallenge, (state, { payload }) => {
    return {
      ...state,
      challenge: {
        ...state.challenge,
        data: payload,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.createChallengeSuccess, (state, { data }) => {
    return {
      ...state,
      challenge: {
        ...state.challenge,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.createChallengeFailure, (state, { error }) => {
    return {
      ...state,
      challenge: {
        ...state.challenge,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // RETRIEVE CHALLNGE
  // ...
  on(ChallengeActions.retrieveChallenge, (state, { pid }) => {
    return {
      ...state,
      challenge: {
        ...state.challenge,
        data: pid,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.retrieveChallengeSuccess, (state, { data }) => {
    return {
      ...state,
      challenge: {
        ...state.challenge,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.retrieveChallengeFailure, (state, { error }) => {
    return {
      ...state,
      challenge: {
        ...state.challenge,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // GET CHALLENGES
  // ...
  on(ChallengeActions.getChallenges, (state) => {
    return {
      ...state,
      challenges: {
        ...state.challenges,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.getChallengesSuccess, (state, { data }) => {
    return {
      ...state,
      challenges: {
        ...state.challenges,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.getChallengesFailure, (state, { error }) => {
    return {
      ...state,
      challenges: {
        ...state.challenges,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // RETRIEVE OTHER CHALLNGE
  // ...
  on(ChallengeActions.retrieveOtherChallenge, (state, { pid }) => {
    return {
      ...state,
      otherChallenge: {
        ...state.otherChallenge,
        data: pid,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.retrieveOtherChallengeSuccess, (state, { data }) => {
    return {
      ...state,
      otherChallenge: {
        ...state.otherChallenge,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.retrieveOtherChallengeFailure, (state, { error }) => {
    return {
      ...state,
      otherChallenge: {
        ...state.otherChallenge,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // GET OTHER CHALLENGES
  // ...
  on(ChallengeActions.getOtherChallenges, (state) => {
    return {
      ...state,
      otherChallenges: {
        ...state.otherChallenges,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.getOtherChallengesSuccess, (state, { data }) => {
    return {
      ...state,
      otherChallenges: {
        ...state.otherChallenges,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.getOtherChallengesFailure, (state, { error }) => {
    return {
      ...state,
      otherChallenges: {
        ...state.otherChallenges,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // LOAD MORE OTHER CHALLENGES
  // ...
  on(ChallengeActions.loadMoreOtherChallenges, (state) => {
    return {
      ...state,
      otherChallenges: {
        ...state.otherChallenges,
        error: null,
      }
    }
  }),
  on(ChallengeActions.loadMoreOtherChallengesSuccess, (state, { data }) => {
    return {
      ...state,
      otherChallenges: {
        ...state.otherChallenges,
        data: [
          ...state.otherChallenges.data,
          ...data,
        ],
        error: null,
      }
    }
  }),
  on(ChallengeActions.loadMoreOtherChallengesFailure, (state, { error }) => {
    return {
      ...state,
      otherChallenges: {
        ...state.otherChallenges,
        error: error,
      }
    }
  }),


  // ...
  // UPLOAD MEDIA
  // ...
  on(ChallengeActions.uploadMedia, (state, { file }) => {
    return {
      ...state,
      uploadMedia: {
        ...state.uploadMedia,
        data: file,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.uploadMediaSuccess, (state, { data }) => {
    return {
      ...state,
      uploadMedia: {
        ...state.uploadMedia,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.uploadMediaFailure, (state, { error }) => {
    return {
      ...state,
      uploadMedia: {
        ...state.uploadMedia,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // CLEAR MEDIA
  // ...
  on(ChallengeActions.clearMedia, (state) => {
    return {
      ...state,
      uploadMedia: initialState.uploadMedia,
    }
  }),


  // ...
  // RETRIEVE BOOK
  // ...
  on(ChallengeActions.retrieveBook, (state, { pid }) => {
    return {
      ...state,
      book: {
        ...state.book,
        data: pid,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.retrieveBookSuccess, (state, { data }) => {
    return {
      ...state,
      book: {
        ...state.book,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.retrieveBookFailure, (state, { error }) => {
    return {
      ...state,
      book: {
        ...state.book,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // GET TAGS
  // ...
  on(ChallengeActions.getTags, (state) => {
    return {
      ...state,
      tags: {
        ...state.tags,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.getTagsSuccess, (state, { data }) => {
    return {
      ...state,
      tags: {
        ...state.tags,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.getTagsFailure, (state, { error }) => {
    return {
      ...state,
      tags: {
        ...state.tags,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // STATS GET CHALLENGES
  // ...
  on(ChallengeActions.statsGetChallenges, (state) => {
    return {
      ...state,
      stats: {
        ...state.stats,
        challenges: {
          ...state.challenges,
          status: Statuses.LOADING,
          error: null,
        }
      }
    }
  }),
  on(ChallengeActions.statsGetChallengesSuccess, (state, { data }) => {
    return {
      ...state,
      stats: {
        ...state.stats,
        challenges: {
          ...state.challenges,
          data: data,
          status: Statuses.SUCCESS,
          error: null,
        }
      }
    }
  }),
  on(ChallengeActions.statsGetChallengesFailure, (state, { error }) => {
    return {
      ...state,
      stats: {
        ...state.stats,
        challenges: {
          ...state.challenges,
          status: Statuses.FAILURE,
          error: error,
        }
      }
    }
  }),


  // ...
  // CREATE REVIEW
  // ...
  on(ChallengeActions.createReview, (state, { payload }) => {
    return {
      ...state,
      review: {
        ...state.review,
        data: payload,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.createReviewSuccess, (state, { data }) => {
    return {
      ...state,
      review: {
        ...state.review,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.createReviewFailure, (state, { error }) => {
    return {
      ...state,
      review: {
        ...state.review,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // RETRIEVE REVIEW
  // ...
  on(ChallengeActions.retrieveReview, (state, { pid }) => {
    return {
      ...state,
      review: {
        ...state.review,
        data: pid,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.retrieveReviewSuccess, (state, { data }) => {
    return {
      ...state,
      review: {
        ...state.review,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.retrieveReviewFailure, (state, { error }) => {
    return {
      ...state,
      review: {
        ...state.review,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // UPDATE REVIEW
  // ...
  on(ChallengeActions.updateReview, (state, { payload }) => {
    return {
      ...state,
      updateReview: {
        ...state.updateReview,
        data: payload,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.updateReviewSuccess, (state, { data }) => {
    return {
      ...state,
      updateReview: {
        ...state.updateReview,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.updateReviewFailure, (state, { error }) => {
    return {
      ...state,
      updateReview: {
        ...state.updateReview,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // DELETE REVIEW
  // ...
  on(ChallengeActions.deleteReview, (state) => {
    return {
      ...state,
      deleteReview: {
        ...state.deleteReview,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.deleteReviewSuccess, (state, { data, pid }) => {
    return {
      ...state,
      deleteReview: {
        ...state.deleteReview,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      },
      review: initialState.review,
      reviews: {
        ...state.reviews,
        data: state.reviews.data.filter((item: any) => item.id != pid),
      }
    }
  }),
  on(ChallengeActions.deleteReviewFailure, (state, { error }) => {
    return {
      ...state,
      deleteReview: {
        ...state.deleteReview,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // GET REVIEWS
  // ...
  on(ChallengeActions.getReviews, (state) => {
    return {
      ...state,
      reviews: {
        ...state.reviews,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ChallengeActions.getReviewsSuccess, (state, { data }) => {
    return {
      ...state,
      reviews: {
        ...state.reviews,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(ChallengeActions.getReviewsFailure, (state, { error }) => {
    return {
      ...state,
      reviews: {
        ...state.reviews,
        status: Statuses.FAILURE,
        error: error,
      }
    }
  }),


  // ...
  // LOAD MORE REVIEWS
  // ...
  on(ChallengeActions.loadMoreReviews, (state) => {
    return {
      ...state,
      reviews: {
        ...state.reviews,
        error: null,
      }
    }
  }),
  on(ChallengeActions.loadMoreReviewsSuccess, (state, { data }) => {
    return {
      ...state,
      reviews: {
        ...state.reviews,
        data: [
          ...state.reviews.data,
          ...data,
        ],
        error: null,
      }
    }
  }),
  on(ChallengeActions.loadMoreReviewsFailure, (state, { error }) => {
    return {
      ...state,
      reviews: {
        ...state.reviews,
        error: error,
      }
    }
  }),

);

