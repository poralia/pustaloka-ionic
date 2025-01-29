import { createReducer, on } from '@ngrx/store';
import { FeedActions } from '../../actions/feed/feed.actions';
import { Statuses } from 'src/app/modules/shared/statuses.enum';

export const feedFeatureKey = 'feed';

export interface FeedState {
  activities: {
    data: any
    status: string
    error: any
  },
  otherActivities: {
    data: any
    status: string
    error: any
  },
  activity: {
    data: any
    status: string
    error: any
  },
  readingHistories: {
    data: any
    status: string
    error: any
  },
  comments: {
    data: any
    status: string
    error: any
  },
}

export const initialState: FeedState = {
  activities: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  otherActivities: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  activity: {
    data: null,
    status: Statuses.IDLE,
    error: null,
  },
  readingHistories: {
    data: [],
    status: Statuses.IDLE,
    error: null,
  },
  comments: {
    data: [],
    status: Statuses.IDLE,
    error: null,
  },
};

export const FeedReducer = createReducer(
  initialState,

  // ...
  // ACTIVITIES LIST
  // ...
  on(FeedActions.loadActivities, (state) => {
    return {
      ...state,
      activities: {
        ...state.activities,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(FeedActions.loadActivitiesSuccess, (state, { data }) => {
    return {
      ...state,
      activities: {
        ...state.activities,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(FeedActions.loadActivitiesFailure, (state, { error }) => {
    return {
      ...state,
      activities: {
        ...state.activities,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // LOAD MORE ACTIVITIES
  // ...
  on(FeedActions.loadMoreActivities, (state) => {
    return {
      ...state,
      activities: {
        ...state.activities,
        error: null,
      }
    }
  }),
  on(FeedActions.loadMoreActivitiesSuccess, (state, { data }) => {
    return {
      ...state,
      activities: {
        ...state.activities,
        data: [
          ...state.activities.data,
          ...data
        ],
        error: null,
      }
    }
  }),
  on(FeedActions.loadMoreActivitiesFailure, (state, { error }) => {
    return {
      ...state,
      activities: {
        ...state.activities,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // OTHER ACTIVITIES LIST
  // ...
  on(FeedActions.loadOtherActivities, (state) => {
    return {
      ...state,
      otherActivities: {
        ...state.otherActivities,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(FeedActions.loadOtherActivitiesSuccess, (state, { data }) => {
    return {
      ...state,
      otherActivities: {
        ...state.otherActivities,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(FeedActions.loadOtherActivitiesFailure, (state, { error }) => {
    return {
      ...state,
      otherActivities: {
        ...state.otherActivities,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // LOAD MORE OTHER ACTIVITIES
  // ...
  on(FeedActions.loadMoreOtherActivities, (state) => {
    return {
      ...state,
      otherActivities: {
        ...state.otherActivities,
        error: null,
      }
    }
  }),
  on(FeedActions.loadMoreOtherActivitiesSuccess, (state, { data }) => {
    return {
      ...state,
      otherActivities: {
        ...state.otherActivities,
        data: [
          ...state.otherActivities.data,
          ...data
        ],
        error: null,
      }
    }
  }),
  on(FeedActions.loadMoreOtherActivitiesFailure, (state, { error }) => {
    return {
      ...state,
      otherActivities: {
        ...state.otherActivities,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // RETRIEVE ACTIVITY
  // ...
  on(FeedActions.retrieveActivity, (state) => {
    return {
      ...state,
      activity: {
        ...state.activity,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(FeedActions.retrieveActivitySuccess, (state, { data }) => {
    return {
      ...state,
      activity: {
        ...state.activity,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(FeedActions.retrieveActivityFailure, (state, { error }) => {
    return {
      ...state,
      activity: {
        ...state.activity,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // READING HISTORIES
  // ...
  on(FeedActions.getReadingHistories, (state) => {
    return {
      ...state,
      readingHistories: {
        ...state.readingHistories,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(FeedActions.getReadingHistoriesSuccess, (state, { data }) => {
    return {
      ...state,
      readingHistories: {
        ...state.readingHistories,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(FeedActions.getReadingHistoriesFailure, (state, { error }) => {
    return {
      ...state,
      readingHistories: {
        ...state.readingHistories,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // GET COMMENTS
  // ...
  on(FeedActions.loadComments, (state) => {
    return {
      ...state,
      comments: {
        ...state.comments,
        status: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(FeedActions.loadCommentsSuccess, (state, { data }) => {
    return {
      ...state,
      comments: {
        ...state.comments,
        data: data,
        status: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(FeedActions.loadCommentsFailure, (state, { error }) => {
    return {
      ...state,
      comments: {
        ...state.comments,
        error: error,
        status: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // LOAD MORE COMMENTS
  // ...
  on(FeedActions.loadMoreComments, (state) => {
    return {
      ...state,
      comments: {
        ...state.comments,
        error: null,
      }
    }
  }),
  on(FeedActions.loadMoreCommentsSuccess, (state, { data }) => {
    return {
      ...state,
      comments: {
        ...state.comments,
        data: [
          ...state.comments.data,
          ...data
        ],
        error: null,
      }
    }
  }),
  on(FeedActions.loadMoreCommentsFailure, (state, { error }) => {
    return {
      ...state,
      comments: {
        ...state.comments,
        error: error,
      }
    }
  }),


  // ...
  // POST COMMENT
  // ...
  on(FeedActions.postComment, (state) => {
    return {
      ...state,
      comments: {
        ...state.comments,
        error: null,
      }
    }
  }),
  on(FeedActions.postCommentSuccess, (state, { data }) => {
    return {
      ...state,
      comments: {
        ...state.comments,
        data: [
          ...data,
          ...state.comments.data,
        ],
        error: null,
      }
    }
  }),
  on(FeedActions.postCommentFailure, (state, { error }) => {
    return {
      ...state,
      comments: {
        ...state.comments,
        error: error,
      }
    }
  }),


  /**
   * MARK ACTIVITY AS FAVORITED
   */
  on(FeedActions.markFavoriteSuccess, (state, { data, pid }) => {
    let newActivitiesData = data.activities ? [...state.activities.data] : [];
    if (state.activities.data && state.activities.data.length > 0) {
      const index = state.activities.data?.findIndex((obj: any) => obj.id == pid);
      const obj = state.activities.data?.find((obj: any) => obj.id == pid);
      const isFavorited = obj?.favorited;
      const favoritedCount = parseInt(obj?.favorited_count);

      newActivitiesData = [
        ...state.activities.data?.slice(0, index),
        {
          ...state.activities.data?.[index],
          favorited: isFavorited ? false : true,
          favorited_count: isFavorited ? favoritedCount - 1 : favoritedCount + 1,
        },
        ...state.activities.data?.slice(index + 1),
      ];
    }

    let newOtherActivitiesData = data.otherActivities ? state.otherActivities.data : [];
    if (state.otherActivities.data && state.otherActivities.data.length > 0) {
      const otherIndex = state.otherActivities.data?.findIndex((obj: any) => obj.id == pid);
      const otherObj = state.otherActivities.data?.find((obj: any) => obj.id == pid);
      const otherIsFavorited = otherObj?.favorited;
      const otherFavoritedCount = parseInt(otherObj?.favorited_count);

      newOtherActivitiesData = [
        ...state.otherActivities.data?.slice(0, otherIndex),
        {
          ...state.otherActivities.data?.[otherIndex],
          favorited: otherIsFavorited ? false : true,
          favorited_count: otherIsFavorited ? otherFavoritedCount - 1 : otherFavoritedCount + 1,
        },
        ...state.otherActivities.data?.slice(otherIndex + 1),
      ];
    }

    return {
      ...state,
      activities: {
        ...state.activities,
        data: newActivitiesData,
      },
      otherActivities: {
        ...state.otherActivities,
        data: newOtherActivitiesData,
      },
    }
  })
);

