export enum HTTPEnpoint {
    LOGIN = 'jwt-auth/v1/token',
    REGISTER = 'buddypress/v1/signup',
    RESEND_ACIVATION = 'buddypress/v1/signup/resend-activation',
    ACTIVATE = 'buddypress/v1/signup/activate',
    OAUTH = 'buddypress/v1/signup/oauth',
    FORGOT_PASSWORD = 'buddypress/v1/members/forgot-password',
    RESET_PASSWORD = 'buddypress/v1/members/reset-password',
    MEMBER = 'buddypress/v1/members',
    FRIENDS = 'buddypress/v1/friends',
    USER = 'wp/v2/users',
}