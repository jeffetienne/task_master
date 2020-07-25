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
    Role: Role;
    role: string;
    Unite: Unite;
    unite: string;
    forme_par: number;
    Status: Status;
    status: string;
    status_date: Date;
    status_by: number;
    status_reason: string;
    cree_par: string;
    cree_le: Date;
    modifie_par: string;
    modifie_le: Date;
    supprime: number;
    supprime_par: string;
    supprime_le: Date;
    supprime_raison: string;
}