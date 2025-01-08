import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IFilterMember, IFriendFilter, IFriendshipRequest, ILogin, IOAuth, IRegister, IResetPassword, IStatsFilter, IUpdateProfile } from '../../../interfaces';
import { HttpErrorResponse } from '@angular/common/http';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ credentials: ILogin }>(),
    'Login Success': props<{ data: any }>(),
    'Login Failure': props<{ error: HttpErrorResponse }>(),

    'Logout': emptyProps(),
    'Logout Success': emptyProps(),

    'Register': props<{ payload: IRegister }>(),
    'Register Success': props<{ data: any, payload: IRegister }>(),
    'Register Failure': props<{ error: HttpErrorResponse, payload: IRegister }>(),

    'Resend Activation': props<{ email: string }>(),
    'Resend Activation Success': props<{ data: any, email: string }>(),
    'Resend Activation Failure': props<{ error: HttpErrorResponse, email: string }>(),

    'Forgot Password': props<{ email: string }>(),
    'Forgot Password Success': props<{ data: any, email: string }>(),
    'Forgot Password Failure': props<{ error: HttpErrorResponse, email: string }>(),

    'Reset Password': props<{ payload: IResetPassword }>(),
    'Reset Password Success': props<{ data: any, payload: IResetPassword }>(),
    'Reset Password Failure': props<{ error: HttpErrorResponse, payload: IResetPassword }>(),

    'Activate': props<{ code: string, email: string }>(),
    'Activate Success': props<{ data: any, code: string, email: string }>(),
    'Activate Failure': props<{ error: HttpErrorResponse, code: string, email: string }>(),

    'Retrieve Me': props<{ uid: string }>(),
    'Retrieve Me Success': props<{ data: any }>(),
    'Retrieve Me Failure': props<{ error: HttpErrorResponse }>(),

    'Update Profile': props<{ uid: string, data: IUpdateProfile }>(),
    'Update Profile Success': props<{ data: any }>(),
    'Update Profile Failure': props<{ error: HttpErrorResponse }>(),

    'Upload Avatar': props<{ uid: string | number, file: File }>(),
    'Upload Avatar Success': props<{ data: any }>(),
    'Upload Avatar Failure': props<{ error: unknown }>(),

    'Retrieve Member': props<{ uid: string }>(),
    'Retrieve Member Success': props<{ data: any }>(),
    'Retrieve Member Failure': props<{ error: HttpErrorResponse }>(),

    'Get Members': props<{ filter: IFilterMember, extra?: any }>(),
    'Get Members Success': props<{ data: any, filter: IFilterMember, extra?: any }>(),
    'Get Members Failure': props<{ error: HttpErrorResponse, filter: IFilterMember, extra?: any }>(),

    'Friendship Request': props<{ data: IFriendshipRequest }>(),
    'Friendship Request Success': props<{ data: any }>(),
    'Friendship Request Failure': props<{ error: HttpErrorResponse }>(),

    'Accept Friendship': props<{ id: number | string }>(),
    'Accept Friendship Success': props<{ data: any, id: number | string }>(),
    'Accept Friendship Failure': props<{ error: HttpErrorResponse, id: number | string }>(),

    'Get Friendship Request': props<{ filter: IFriendFilter }>(),
    'Get Friendship Request Success': props<{ data: any, filter: IFriendFilter }>(),
    'Get Friendship Request Failure': props<{ error: HttpErrorResponse, filter: IFriendFilter }>(),

    'Get Friends': props<{ filter: IFriendFilter }>(),
    'Get Friends Success': props<{ data: any, filter: IFriendFilter }>(),
    'Get Friends Failure': props<{ error: HttpErrorResponse, filter: IFriendFilter }>(),

    'Load More Get Friends': props<{ filter: IFriendFilter }>(),
    'Load More Get Friends Success': props<{ data: any, filter: IFriendFilter }>(),
    'Load More Get Friends Failure': props<{ error: HttpErrorResponse, filter: IFriendFilter }>(),

    'Check OAuth': props<{ payload: IOAuth }>(),
    'Check OAuth Success': props<{ data: any, payload: IOAuth }>(),
    'Check OAuth Failure': props<{ error: HttpErrorResponse, payload: IOAuth }>(),

    'Get Stats': props<{ filter: IStatsFilter }>(),
    'Get Stats Success': props<{ data: any, filter: IStatsFilter }>(),
    'Get Stats Failure': props<{ error: HttpErrorResponse, filter: IStatsFilter }>(),
  }
});
