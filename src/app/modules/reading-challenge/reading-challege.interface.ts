export interface ISubmitBook {
    title: string
    book_author: string[]
    featured_media: number
    status?: string
    meta: {
        number_of_pages: number
    }
}

export interface ICreateChallenge {
    title: string
    status: string
    parent?: number
    meta: {
        number_of_pages: number
        book?: number
        from_datetime: string
        to_datetime?: string
        status: string
    }
}

export interface ICreateReading {
    title: string
    status: string
    meta: {
        challenge: number
        duration?: string
        from_page?: string
        to_page?: string
        from_datetime: string
        to_datetime?: string
    }
}

export interface IUpdateReading {
    content?: string
    tags?: string[]
    status: string
    meta: {
        from_page: string
        to_page: string
        from_datetime: string
        to_datetime: string
    }
    extra?: any // not associated with any wordpress data
}

export interface IPostFilter {
    author: string
    status?: string
    meta_query?: any
    page?: number
    per_page?: number
    exclude?: any[]
    search?: string
    search_columns?: string[]
    orderby?: string
    tags?: any
}