import { User } from './user';

export class Patient extends User {
    id!: number;
    DiseaseName!: string;
    DiseaseId!: number;
    DiyetName!: string;
    DiyetId!: number;
}