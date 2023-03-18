import { UserInterface } from 'entities/records/user'
import { TypeInsert } from 'entities/types'

type News = {
    '/user/login': {
        post: {
            body: TypeInsert<UserInterface>,
            response: Promise<UserInterface>
        }
    }
}

export default News
