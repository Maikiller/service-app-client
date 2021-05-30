import * as moment from 'moment'

export class Cliente {
    id!: number;
    nome!: string;
    cpf!: string;
    data = moment().format('DD/MM/YYYY');
}