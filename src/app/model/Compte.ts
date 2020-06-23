import { Role } from './Role';
import { Unite } from './Unite';
import { Status } from './Status';

export class Compte{
    Id: number;
    demandeur: number;
    date_demande: Date;
    id_beneficiaire: number;
    username: string;
    firstname: string;
    lastname: string;
    role_ref: Role;
    role: number;
    unite_ref: Unite;
    unite: number;
    forme_par: number;
    status_ref: Status;
    status: number;
    status_date: Date;
    status_by: number;
    status_reason: string;
    cree_par: string;
    cree_le: Date;
    modifie_par: string;
    modifie_le: Date;
}