import { ControllerModel, ServiceModel } from 'app/models'
import { Request, Response } from 'express'
import { Validator } from 'sub_modules/utils/helpers/validator'
import { parseQuerys } from 'sub_modules/utils'
import { Anyses } from 'sub_modules/apiface/_type'
import { Apiface_V1_Job } from 'sub_modules/apiface'

export const service = new ServiceModel('http://dev3.dansmultipro.co.id/api/recruitment')
type Apiface = Apiface_V1_Job
class JobController extends ControllerModel {
	route(): Anyses<Apiface> {
		return {
			'/job': {
				get: this.getJobs,
			},
			'/job/:id': {
				get: this.getTopicDetail,
			}
		}
	}

	private getJobs = async (req: Request, res: Response):
		Apiface['/job']['get']['response'] =>
		this.transaction(req, res, async transaction => {

			const filter = parseQuerys(req, {
				description: 'STRING',
				location: 'STRING',
				full_time: 'BOOL'
			})

			const option = parseQuerys(req, {
				page: 'NUMBER',
			})

			Validator({
				...filter,
				...option
			}, {
				description: 'string?',
				location: 'string?',
				full_time: 'boolean?',
				page: 'number?'
			})

			return await service.GET('/positions.json', {
				query: {
					...filter,
					...option
				}
			})
		})

	private getTopicDetail = async (req: Request, res: Response):
		Apiface['/job/:id']['get']['response'] =>
		this.transaction(req, res, async transaction => {

			return await service.GET('/positions/' + req.params.id)
		})

}
export default new JobController()
