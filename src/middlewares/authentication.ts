import Codes from 'utils/constants/code'
import ErrorModel from 'app/models/error'

import {
	NextFunction,
	Request,
	Response,
} from 'express'
import { JwtHandler } from 'app/handlers'


/**
 * 
 * @param optional ? = optional user auth, ! = only user auth
 * @returns 
 */
export default function (optional?: '!' | '?') {

	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			if (res.locals.data?.next) {
				res.locals.data.next = true
				return next()
			}

			if (optional === '?') {
				if (req.header('Authorization')) {
					await Auth({ req, res })
				}
				res.locals.data.next = true
				return next()
			}


			if (optional === '!') {
				await Auth({ req, res })
				res.locals.data.next = true
				return next()
			}

			await Auth({ req, res })
			res.locals.data.next = true
			return next()
		} catch (e) {
			Logger('auth', e)
			return res.status(Codes.httpstatus.unauthorized).json(e)
		}
	}

	async function Auth({
		req,
		res
	}: {
		req: Request,
		res: Response
	}) {
		const token = req.header('Authorization')?.split(' ')?.[1] ?? req.query?.token as string

		res.locals.data.token = token

		if (!token) {
			throw new ErrorModel('NOT_AUTHORIZED', 'ERR_100|Parameter not satisfied', 'Authorization token does not exist')
		}

		const user = JwtHandler.decode(token) as {
			user_id: number
		}

		if (!user?.user_id) {
			throw new ErrorModel('NOT_AUTHORIZED', 'ERR_100|Parameter not satisfied', 'Token result invalid!')
		}

		res.locals.data.user = {
			id: user?.user_id
		}

	}

}


