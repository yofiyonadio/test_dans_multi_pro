import RecordModel, { TypeColumns } from '../models/record'
import {
    Column
} from 'typeorm'
import { InterfaceModel } from '../models'
import { BcryptHandler } from 'app/handlers'

export interface UserInterface extends InterfaceModel {
    username: string
    password: string
}


export class UserRecord extends RecordModel implements Required<UserInterface> {

    public static table = {
        schema: 'app',
        name: 'user',
        comment: '@omit create,update,delete',
    }

    public static columns: TypeColumns<UserInterface> = {
        ...RecordModel.base_columns(),
        username: true,
        password: true
    }

    @Column({
        ...RecordModel.column_varchar({
            nullable: false,
            length: '50',
        })
    })
    username: string

    @Column({
        ...RecordModel.column_varchar({
            nullable: false,
            length: '255',
        })
    })
    password: string


    // ====================== TYPORM RELATION DEFINITION =======================

    public seeder(): UserInterface[] {
        return require('../../../data/user.json').map((user: UserInterface, n: number) => {
            return {
                ...user,
                password: BcryptHandler.encrypt(user.password),
                id: n + 1,
            }
        })
    }

}

export default UserRecord
