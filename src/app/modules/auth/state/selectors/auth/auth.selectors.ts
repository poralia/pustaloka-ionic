import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from '../../reducers/auth/auth.reducer';

export const authSelectFeature = createFeatureSelector<AuthState>(authFeatureKey);

export const login = createSelector(
    authSelectFeature,
    (state: AuthState) => state.login,
);

export const register = createSelector(
    authSelectFeature,
    (state: AuthState) => state.register,
);

export const activation = createSelector(
    authSelectFeature,
    (state: AuthState) => state.activation,
);

export const activate = createSelector(
    authSelectFeature,
    (state: AuthState) => state.activate,
);

export const forgotPassword = createSelector(
    authSelectFeature,
    (state: AuthState) => state.forgotPassword,
);

export const resetPassword = createSelector(
    authSelectFeature,
    (state: AuthState) => state.resetPassword,
);

export const me = createSelector(
    authSelectFeature,
    (state: AuthState) => {
        return state.me;
    },
);

export const member = createSelector(
    authSelectFeature,
    (state: AuthState) => {
        return state.member;
    },
);

export const members = createSelector(
    authSelectFeature,
    (state: AuthState) => state.members,
);

export const friendshipRequest = createSelector(
    authSelectFeature,
    (state: AuthState) => state.friendshipRequest,
);

export const friends = createSelector(
    authSelectFeature,
    (state: AuthState) => state.friends,
);