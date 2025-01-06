import { createReducer, on } from '@ngrx/store';
import { ReadingChallengeActions } from '../../actions/reading-challenge/reading-challenge.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Statuses } from 'src/app/modules/shared/statuses.enum';

export const readingChallengeFeatureKey = 'readingChallenge';

export interface ReadingChallengeState {
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

export const initialState: ReadingChallengeState = {
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

export const ReadingChallengeReducer = createReducer(
  initialState,

  // ...
  // SUBMIT BOOK
  // ...
  on(ReadingChallengeActions.submitBook, (state, { payload }) => {
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
  on(ReadingChallengeActions.submitBookSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.submitBookFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.createReading, (state, { payload }) => {
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
  on(ReadingChallengeActions.createReadingSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.createReadingFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.retrieveReading, (state, { pid }) => {
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
  on(ReadingChallengeActions.retrieveReadingSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.retrieveReadingFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.updateReading, (state, { payload }) => {
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
  on(ReadingChallengeActions.updateReadingSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.updateReadingFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.deleteReading, (state) => {
    return {
      ...state,
      deleteReading: {
        ...state.deleteReading,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ReadingChallengeActions.deleteReadingSuccess, (state, { data, pid }) => {
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
  on(ReadingChallengeActions.deleteReadingFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.getReadings, (state) => {
    return {
      ...state,
      readings: {
        ...state.readings,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ReadingChallengeActions.getReadingsSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.getReadingsFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.getReadingsDraft, (state) => {
    return {
      ...state,
      readingsDraft: {
        ...state.readingsDraft,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ReadingChallengeActions.getReadingsDraftSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.getReadingsDraftFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.loadMoreReadings, (state) => {
    return {
      ...state,
      readings: {
        ...state.readings,
        error: null,
      }
    }
  }),
  on(ReadingChallengeActions.loadMoreReadingsSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.loadMoreReadingsFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.createChallenge, (state, { payload }) => {
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
  on(ReadingChallengeActions.createChallengeSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.createChallengeFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.retrieveChallenge, (state, { pid }) => {
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
  on(ReadingChallengeActions.retrieveChallengeSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.retrieveChallengeFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.getChallenges, (state) => {
    return {
      ...state,
      challenges: {
        ...state.challenges,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ReadingChallengeActions.getChallengesSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.getChallengesFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.retrieveOtherChallenge, (state, { pid }) => {
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
  on(ReadingChallengeActions.retrieveOtherChallengeSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.retrieveOtherChallengeFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.getOtherChallenges, (state) => {
    return {
      ...state,
      otherChallenges: {
        ...state.otherChallenges,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ReadingChallengeActions.getOtherChallengesSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.getOtherChallengesFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.loadMoreOtherChallenges, (state) => {
    return {
      ...state,
      otherChallenges: {
        ...state.otherChallenges,
        error: null,
      }
    }
  }),
  on(ReadingChallengeActions.loadMoreOtherChallengesSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.loadMoreOtherChallengesFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.uploadMedia, (state, { file }) => {
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
  on(ReadingChallengeActions.uploadMediaSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.uploadMediaFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.clearMedia, (state) => {
    return {
      ...state,
      uploadMedia: initialState.uploadMedia,
    }
  }),


  // ...
  // RETRIEVE BOOK
  // ...
  on(ReadingChallengeActions.retrieveBook, (state, { pid }) => {
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
  on(ReadingChallengeActions.retrieveBookSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.retrieveBookFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.getTags, (state) => {
    return {
      ...state,
      tags: {
        ...state.tags,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(ReadingChallengeActions.getTagsSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.getTagsFailure, (state, { error }) => {
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
  on(ReadingChallengeActions.statsGetChallenges, (state) => {
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
  on(ReadingChallengeActions.statsGetChallengesSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.statsGetChallengesFailure, (state, { error }) => {
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

);

