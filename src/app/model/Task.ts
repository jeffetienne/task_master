import { Objet } from './objet_demande';
import { Status } from './Status';
import { Priority } from './priority';

export class Task {
    Id: number;
    objet: string;
    type_demande: Objet;
    demande: number;
    assign_to: number;
    assign_date: Date;
    deadline: Date;
    priority: string;
    Priority: Priority;
    status: string;
    Status: Status;
    status_date: Date;
    status_by: number;
    status_reason: string;
    cree_par: string;
    cree_le: Date;
    modifie_par: string;
    modifie_le: Date;
}