import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../../actions/auth/auth.actions';
import { ChallengeActions } from 'src/app/modules/challenge/state/actions/challenge/challenge.actions';
import { Statuses } from 'src/app/modules/shared/statuses.enum';
import { reading } from 'src/app/modules/challenge/state/selectors/challenge/challenge.selectors';
import { InitialState } from '@ngrx/store/src/models';

export const authFeatureKey = 'auth';

export interface AuthState {
  login: {
    data: any
    statuses: string
    error: any | null
  },
  register: {
    data: any
    statuses: string
    error: any | null
  },
  activation: {
    data: any
    statuses: string
    error: any | null
  },
  activate: {
    data: any
    statuses: string
    error: any | null
  },
  forgotPassword: {
    data: any
    statuses: string
    error: any | null
  },
  resetPassword: {
    data: any
    statuses: string
    error: any | null
  },
  me: {
    data: any
    statuses: string
    error: any | null
  },
  member: {
    data: any
    statuses: string
    error: any | null
  },
  members: {
    data: any
    statuses: string
    error: any | null
  },
  updateProfile: {
    data: any
    statuses: string
    error: any | null
  },
  uploadAvatar: {
    data: any
    statuses: string
    error: any | null
  },
  friendshipRequest: {
    data: any
    statuses: string
    error: any | null
  },
  friends: {
    data: any
    statuses: string
    error: any | null
  },
  oauth: {
    data: any
    statuses: string
    error: any | null
  },
  stats: {
    daily: {
      data: any
      statuses: string
      error: any | null
    },
    book: {
      data: any
      statuses: string
      error: any | null
    },
    general: {
      data: any
      statuses: string
      error: any | null
    },
    generalOther: {
      data: any
      statuses: string
      error: any | null
    }
  },
}

export const initialState: AuthState = {
  login: {
    data: null,
    statuses: Statuses.IDLE,
    error: null,
  },
  register: {
    data: null,
    statuses: Statuses.IDLE,
    error: null,
  },
  activation: {
    data: null,
    statuses: Statuses.IDLE,
    error: null,
  },
  activate: {
    data: null,
    statuses: Statuses.IDLE,
    error: null,
  },
  forgotPassword: {
    data: null,
    statuses: Statuses.IDLE,
    error: null,
  },
  resetPassword: {
    data: null,
    statuses: Statuses.IDLE,
    error: null,
  },
  me: {
    data: null,
    statuses: Statuses.IDLE,
    error: null,
  },
  member: {
    data: null,
    statuses: Statuses.IDLE,
    error: null,
  },
  members: {
    data: [],
    statuses: Statuses.IDLE,
    error: null,
  },
  updateProfile: {
    data: [],
    statuses: Statuses.IDLE,
    error: null,
  },
  uploadAvatar: {
    data: [],
    statuses: Statuses.IDLE,
    error: null,
  },
  friendshipRequest: {
    data: null,
    statuses: Statuses.IDLE,
    error: null,
  },
  friends: {
    data: [],
    statuses: Statuses.IDLE,
    error: null,
  },
  oauth: {
    data: null,
    statuses: Statuses.IDLE,
    error: null,
  },
  stats: {
    daily: {
      data: [],
      statuses: Statuses.IDLE,
      error: null,
    },
    book: {
      data: [],
      statuses: Statuses.IDLE,
      error: null,
    },
    general: {
      data: null,
      statuses: Statuses.IDLE,
      error: null,
    },
    generalOther: {
      data: null,
      statuses: Statuses.IDLE,
      error: null,
    },
  },
};

export const AuthReducer = createReducer(
  initialState,

  // ...
  // LOGIN
  // ...
  on(AuthActions.login, (state, { credentials }) => {
    return {
      ...state,
      login: {
        ...state.login,
        data: credentials,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.loginSuccess, (state, { data }) => {
    return {
      ...state,
      login: {
        ...state.login,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(AuthActions.loginFailure, (state, { error }) => {
    return {
      ...state,
      login: {
        ...state.login,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // LOGOUT
  // ...
  on(AuthActions.logoutSuccess, (state) => {
    return initialState;
  }),


  // ...
  // REGISTER
  // ...
  on(AuthActions.register, (state, { payload }) => {
    return {
      ...state,
      register: {
        ...state.register,
        data: payload,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.registerSuccess, (state, { data }) => {
    return {
      ...state,
      register: {
        ...state.register,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(AuthActions.registerFailure, (state, { error }) => {
    return {
      ...state,
      register: {
        ...state.register,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // ACTIVATE
  // ...
  on(AuthActions.activate, (state, { code }) => {
    return {
      ...state,
      activatie: {
        ...state.activate,
        data: code,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.activateSuccess, (state, { data }) => {
    return {
      ...state,
      activate: {
        ...state.activate,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(AuthActions.activateFailure, (state, { error }) => {
    return {
      ...state,
      activate: {
        ...state.activate,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // FORGOT PASSWORD
  // ...
  on(AuthActions.forgotPassword, (state, { email }) => {
    return {
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        data: email,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.forgotPasswordSuccess, (state, { data }) => {
    return {
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(AuthActions.forgotPasswordFailure, (state, { error }) => {
    return {
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // RESET PASSWORD
  // ...
  on(AuthActions.resetPassword, (state, { payload }) => {
    return {
      ...state,
      resetPassword: {
        ...state.resetPassword,
        data: payload,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.resetPasswordSuccess, (state, { data }) => {
    return {
      ...state,
      resetPassword: {
        ...state.resetPassword,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(AuthActions.resetPasswordFailure, (state, { error }) => {
    return {
      ...state,
      resetPassword: {
        ...state.resetPassword,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // RETRIEVE ME
  // ...
  on(AuthActions.retrieveMe, (state) => {
    return {
      ...state,
      me: {
        ...state.me,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.retrieveMeSuccess, (state, { data }) => {
    return {
      ...state,
      me: {
        ...state.me,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(AuthActions.retrieveMeFailure, (state, { error }) => {
    return {
      ...state,
      me: {
        ...state.me,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // GET MEMBERS
  // ...
  on(AuthActions.getMembers, (state) => {
    return {
      ...state,
      members: {
        ...state.members,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.getMembersSuccess, (state, { data }) => {
    return {
      ...state,
      members: {
        ...state.members,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(AuthActions.getMembersFailure, (state, { error }) => {
    return {
      ...state,
      members: {
        ...state.members,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // RETRIEVE MEMBER
  // ...
  on(AuthActions.retrieveMember, (state) => {
    return {
      ...state,
      member: {
        ...state.member,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.retrieveMemberSuccess, (state, { data }) => {
    return {
      ...state,
      member: {
        ...state.member,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(AuthActions.retrieveMemberFailure, (state, { error }) => {
    return {
      ...state,
      member: {
        ...state.member,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // UPDATE PROFILE
  // ...
  on(AuthActions.updateProfile, (state) => {
    return {
      ...state,
      updateProfile: {
        ...state.updateProfile,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.updateProfileSuccess, (state, { data }) => {
    return {
      ...state,
      updateProfile: {
        ...state.updateProfile,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      },
      me: {
        ...state.me,
        data: {
          ...state.me.data,
          name: data.name,
          mention_name: data.username,
        },
      },
    }
  }),
  on(AuthActions.updateProfileFailure, (state, { error }) => {
    return {
      ...state,
      updateProfile: {
        ...state.updateProfile,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // UPLOAD AVATAR
  // ...
  on(AuthActions.uploadAvatar, (state) => {
    return {
      ...state,
      uploadAvatar: {
        ...state.uploadAvatar,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.uploadAvatarSuccess, (state, { data }) => {
    return {
      ...state,
      uploadAvatar: {
        ...state.uploadAvatar,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      },
      me: {
        ...state.me,
        data: {
          ...state.me.data,
          avatar_urls: data,
        },
      },
    }
  }),
  on(AuthActions.uploadAvatarFailure, (state, { error }) => {
    return {
      ...state,
      uploadAvatar: {
        ...state.uploadAvatar,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // LISTEN FROM CHALLENGE CREATED
  on(ChallengeActions.createChallengeSuccess, (state, { data }) => {
    const prevOnGoing = +state.me.data.reading.count.ongoing;

    return {
      ...state,
      me: {
        ...state.me,
        data: {
          ...state.me.data,
          reading: {
            ...state.me.data.reading,
            count: {
              ...state.me.data.reading.count,
              ongoing: prevOnGoing + 1,
            }
          }
        }
      }
    }
  }),


  // ...
  // FRIENDSHIP REQUEST
  // ...
  on(AuthActions.friendshipRequest, (state) => {
    return {
      ...state,
      friendshipRequest: {
        ...state.friendshipRequest,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.friendshipRequestSuccess, (state, { data }) => {
    return {
      ...state,
      friendshipRequest: {
        ...state.friendshipRequest,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      }
    }
  }),
  on(AuthActions.friendshipRequestFailure, (state, { error }) => {
    return {
      ...state,
      friendshipRequest: {
        ...state.friendshipRequest,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // GET FRIENDS
  // ...
  on(AuthActions.getFriends, (state) => {
    return {
      ...state,
      friends: {
        ...state.friends,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.getFriendsSuccess, (state, { data }) => {
    return {
      ...state,
      friends: {
        ...state.friends,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      },
    }
  }),
  on(AuthActions.getFriendsFailure, (state, { error }) => {
    return {
      ...state,
      friends: {
        ...state.friends,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // ACCEPT FRIENDSHIP
  // ...
  on(AuthActions.acceptFriendship, (state) => {
    return {
      ...state,
      friends: {
        ...state.friends,
      }
    }
  }),
  on(AuthActions.acceptFriendshipSuccess, (state, { data, id }) => {
    return {
      ...state,
      friends: {
        ...state.friends,
        data: data.filter((item: any) => item.id != id),
      },
    }
  }),
  on(AuthActions.acceptFriendshipFailure, (state, { error }) => {
    return {
      ...state,
      friends: {
        ...state.friends,
      }
    }
  }),


  // LISTEN READING UPDATED
  on(ChallengeActions.updateReadingSuccess, (state, { data }) => {
    const prevDone = +state.me.data.reading.count.done;
    const doneCount = data?.meta?.progress >= 100 ? prevDone + 1 : 0;
    const prevOnGoing = +state.me.data.reading.count.ongoing;
    const onGoingCount = data?.meta?.progress >= 100 ? prevOnGoing - 1 : prevOnGoing;

    return {
      ...state,
      me: {
        ...state.me,
        data: {
          ...state.me.data,
          reading: {
            ...state.me.data.reading,
            count: {
              ...state.me.data.reading.count,
              done: doneCount,
              ongoing: onGoingCount,
            }
          }
        }
      }
    }
  }),


  // ...
  // CHECK OAUTH
  // ...
  on(AuthActions.checkOAuth, (state, { payload }) => {
    return {
      ...state,
      oauth: {
        ...state.oauth,
        data: payload,
        statuses: Statuses.LOADING,
        error: null,
      }
    }
  }),
  on(AuthActions.checkOAuthSuccess, (state, { data }) => {
    return {
      ...state,
      oauth: {
        ...state.oauth,
        data: data,
        statuses: Statuses.SUCCESS,
        error: null,
      },
    }
  }),
  on(AuthActions.checkOAuthFailure, (state, { error }) => {
    return {
      ...state,
      oauth: {
        ...state.oauth,
        error: error,
        statuses: Statuses.FAILURE,
      }
    }
  }),


  // ...
  // GET DAILY STATS
  // ...
  on(AuthActions.getDailyStats, (state, { filter }) => {
    const view = filter.view;

    if (view === 'daily') {
      return {
        ...state,
        stats: {
          ...state.stats,
          daily: {
            ...state.stats.daily,
            statuses: Statuses.LOADING,
            error: null,
          }
        }
      }
    }

    return { ...state }
  }),
  on(AuthActions.getDailyStatsSuccess, (state, { data, filter }) => {
    const view = filter.view;

    if (view === 'daily') {
      return {
        ...state,
        stats: {
          ...state.stats,
          daily: {
            ...state.stats.daily,
            data: data,
            statuses: Statuses.SUCCESS,
            error: null,
          }
        }
      }
    }
    
    return { ...state }
  }),
  on(AuthActions.getDailyStatsFailure, (state, { error, filter }) => {
    const view = filter.view;

    if (view === 'daily') {
      return {
        ...state,
        stats: {
          ...state.stats,
          daily: {
            ...state.stats.daily,
            statuses: Statuses.FAILURE,
            error: error,
          }
        }
      }
    }

    return { ...state }
  }),


  // ...
  // GET BOOK STATS
  // ...
  on(AuthActions.getBookStats, (state, { filter }) => {
    const view = filter.view;

    if (view === 'book') {
      return {
        ...state,
        stats: {
          ...state.stats,
          book: {
            ...state.stats.book,
            statuses: Statuses.LOADING,
            error: null,
          }
        }
      }
    }

    return { ...state }
  }),
  on(AuthActions.getBookStatsSuccess, (state, { data, filter }) => {
    const view = filter.view;

    if (view === 'book') {
      return {
        ...state,
        stats: {
          ...state.stats,
          book: {
            ...state.stats.book,
            data: data,
            statuses: Statuses.SUCCESS,
            error: null,
          }
        }
      }
    }
    
    return { ...state }
  }),
  on(AuthActions.getBookStatsFailure, (state, { error, filter }) => {
    const view = filter.view;

    if (view === 'book') {
      return {
        ...state,
        stats: {
          ...state.stats,
          book: {
            ...state.stats.book,
            statuses: Statuses.FAILURE,
            error: error,
          }
        }
      }
    }

    return { ...state }
  }),


  // ...
  // GET GENERAL STATS
  // ...
  on(AuthActions.getGeneralStats, (state, { filter }) => {
    const view = filter.view;

    if (view === 'general') {
      return {
        ...state,
        stats: {
          ...state.stats,
          general: {
            ...state.stats.general,
            statuses: Statuses.LOADING,
            error: null,
          }
        }
      }
    }

    return { ...state }
  }),
  on(AuthActions.getGeneralStatsSuccess, (state, { data, filter }) => {
    const view = filter.view;

    if (view === 'general') {
      return {
        ...state,
        stats: {
          ...state.stats,
          general: {
            ...state.stats.general,
            data: data,
            statuses: Statuses.SUCCESS,
            error: null,
          }
        }
      }
    }
    
    return { ...state }
  }),
  on(AuthActions.getGeneralStatsFailure, (state, { error, filter }) => {
    const view = filter.view;

    if (view === 'general') {
      return {
        ...state,
        stats: {
          ...state.stats,
          general: {
            ...state.stats.general,
            statuses: Statuses.FAILURE,
            error: error,
          }
        }
      }
    }

    return { ...state }
  }),


  // ...
  // GET OTHERS GENERAL STATS
  // ...
  on(AuthActions.getOtherGeneralStats, (state, { filter }) => {
    const view = filter.view;

    if (view === 'general') {
      return {
        ...state,
        stats: {
          ...state.stats,
          generalOther: {
            ...state.stats.generalOther,
            statuses: Statuses.LOADING,
            error: null,
          }
        }
      }
    }

    return { ...state }
  }),
  on(AuthActions.getOtherGeneralStatsSuccess, (state, { data, filter }) => {
    const view = filter.view;

    if (view === 'general') {
      return {
        ...state,
        stats: {
          ...state.stats,
          generalOther: {
            ...state.stats.generalOther,
            data: data,
            statuses: Statuses.SUCCESS,
            error: null,
          }
        }
      }
    }
    
    return { ...state }
  }),
  on(AuthActions.getOtherGeneralStatsFailure, (state, { error, filter }) => {
    const view = filter.view;

    if (view === 'general') {
      return {
        ...state,
        stats: {
          ...state.stats,
          generalOther: {
            ...state.stats.generalOther,
            statuses: Statuses.FAILURE,
            error: error,
          }
        }
      }
    }

    return { ...state }
  }),

);

