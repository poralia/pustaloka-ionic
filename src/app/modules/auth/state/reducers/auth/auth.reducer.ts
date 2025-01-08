import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../../actions/auth/auth.actions';
import { ReadingChallengeActions } from 'src/app/modules/reading-challenge/state/actions/reading-challenge/reading-challenge.actions';
import { Statuses } from 'src/app/modules/shared/statuses.enum';
import { reading } from 'src/app/modules/reading-challenge/state/selectors/reading-challenge/reading-challenge.selectors';
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
    pages_everyday: {
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
    pages_everyday: {
      data: [],
      statuses: Statuses.IDLE,
      error: null,
    }
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
  on(ReadingChallengeActions.createChallengeSuccess, (state, { data }) => {
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
  on(ReadingChallengeActions.updateReadingSuccess, (state, { data }) => {
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
  // GET STATS
  // ...
  on(AuthActions.getStats, (state, { filter }) => {
    const view = filter.view;

    if (view === 'pages_everyday') {
      return {
        ...state,
        stats: {
          ...state.stats,
          [view]: {
            ...state.stats[view],
            status: Statuses.LOADING,
            error: null,
          }
        }
      }
    }

    return { ...state }
  }),
  on(AuthActions.getStatsSuccess, (state, { data, filter }) => {
    const view = filter.view;

    if (view === 'pages_everyday') {
      return {
        ...state,
        stats: {
          ...state.stats,
          pages_everyday: {
            ...state.stats.pages_everyday,
            data: data,
            status: Statuses.SUCCESS,
            error: null,
          }
        }
      }
    }
    
    return { ...state }
  }),
  on(AuthActions.getStatsFailure, (state, { error, filter }) => {
    const view = filter.view;

    if (view === 'pages_everyday') {
      return {
        ...state,
        stats: {
          ...state.stats,
          pages_everyday: {
            ...state.stats.pages_everyday,
            status: Statuses.FAILURE,
            error: error,
          }
        }
      }
    }

    return { ...state }
  }),
);

