import {
	NextFunction,
	Request,
	Response,
} from 'express'

export default function () {
	return (req: Request, res: Response, next: NextFunction) => {
		res.locals.data = {
			user: {}
		}
		res.type('json')
		return next()
	}
}


