import { ControllerModel, ErrorModel } from 'app/models'
import { Request, Response } from 'express'
import { Validator } from 'sub_modules/utils/helpers/validator'
import { Anyses } from 'sub_modules/apiface/_type'
import { Apiface_V1_User } from 'sub_modules/apiface'
import { UserRepository } from 'app/repositories'
import { BcryptHandler, JwtHandler } from 'app/handlers'

type Apiface = Apiface_V1_User
class NewsController extends ControllerModel {

	route(): Anyses<Apiface> {
		return {
			'/user/login': {
				post: this.login
			},
		}
	}

	private login = async (req: Request, res: Response):
		Apiface['/user/login']['post']['response'] =>
		this.transaction(req, res, async transaction => {

			const user: Apiface['/user/login']['post']['body'] = req.body

			Validator(user, {
				username: 'string',
				password: 'string'
			})

			const users = await UserRepository.getUser({
				filter: {
					username: user.username
				},
				option: {
					get: 'ONE',
				}
			}, transaction)

			if (!users?.id) {
				throw new ErrorModel('NOT_FOUND', 'ERR_101|NULL', 'username not found')
			}

			BcryptHandler.decrypt(user.password, users.password)

			const token = JwtHandler.encode({
				user_id: users.id
			})

			return {
				...users,
				token
			}
		})
}
export default new NewsController()
