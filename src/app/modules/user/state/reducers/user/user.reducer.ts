import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../../actions/user/user.actions';

export const userFeatureKey = 'user';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
);

