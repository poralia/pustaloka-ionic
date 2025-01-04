export interface IFilter {
    type?: string[]
    component?: string
    per_page: number
    page: number
    scope?: string
    display_comments?: string
    primary_id?: number
    secondary_id?: number
}

export interface ICreateActivity {
    primary_item_id?: number
    secondary_item_id?: number
    user_id?: number
    component?: string
    type?: string
    content?: string
}