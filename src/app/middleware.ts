import AuthenticationMiddleware from 'middlewares/authentication'
import ModifierMiddleware from 'middlewares/modifier'

import { Application } from 'express'

export default {
	init(app: Application) {
		app.use('/', ModifierMiddleware())
		app.use('/v1/job', AuthenticationMiddleware('!'))
		app.use('/*', AuthenticationMiddleware('?'))
	}
}
