
type Topic = {
    '/job': {
        get: {
            query: {
                description?: string
                location?: string
                full_time?: boolean
                page?: number
            }
            response: Promise<{ [key: string]: any }[]>
        }
    }
    '/job/:id': {
        get: {
            response: Promise<{ [key: string]: any }>
        }
    }
}

export default Topic
