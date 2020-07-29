import { Application } from './Application';
import { Status } from './Status';

export class AjoutModule {
    Id: number;
    demandeur: number;
    date_demande: Date;
    application: string;
    Application: Application;
    sommaire: string;
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