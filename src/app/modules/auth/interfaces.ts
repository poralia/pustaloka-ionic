export interface ILogin {
    username: string
    password: string
}

export interface IRegister {
    context: string
    password: string
    user_email: string
    display_name: string
    signup_field_data: any[]
    google_access_token?: string
    google_id_token?: string
    google_profile_id?: string
}

export interface IResetPassword {
    user_email: string
    security_code: string
    new_password: string
    confirm_password: string
}

export interface IFilterMember {
    page: number
    per_page: number
    search?: string
    type?: 'active' | 'random' | 'online' | 'popular'
    exclude?: number[]
}

export interface IUpdateProfile {
    name: string
    mention_name: string
}

export interface IFriendshipRequest {
    initiator_id: number
    friend_id: number
}

export interface IFriendFilter {
    context?: string
    page: number
    per_page: number
    id?: number
    user_id?: number
    is_confirmed?: number
    initiator_id?: number
    friend_id?: number

    // custom parameter
    show_as?: 'friend' | 'requested' | 'incoming'
}