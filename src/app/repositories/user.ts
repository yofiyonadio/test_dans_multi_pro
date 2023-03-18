import RepositoryModel, { GETTER, OPTION, Returned, TypeFilter } from 'sub_modules/utils/libs/typeorm'
import { EntityManager, SelectQueryBuilder } from 'typeorm'
import UserRecord, { UserInterface } from 'entities/records/user'


class NewsRepository extends RepositoryModel {

	static __displayName = 'NewsRepository'

	// ============================= INSERT =============================

	// ============================= UPDATE =============================

	// ============================= GETTER =============================

	async getUser<T extends UserInterface, GET extends GETTER>(
		{
			filter,
			option,
		}: {
			filter?: TypeFilter<Partial<UserInterface>>,
			option: OPTION<GET>
		}, transaction: EntityManager
	): Returned<T, GET> {
		return await this.querySelectNew(UserRecord, 'user', (Q: SelectQueryBuilder<T>) => {
			return Q
		}, {
			...option,
			filter,
		}, transaction)
	}

	// ============================= DELETE =============================

	// ============================ PRIVATES ============================
}

export default new NewsRepository()
