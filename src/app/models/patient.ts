import { User } from './user';

export class Patient extends User {
    id!: number;
    DiseaseId!: number;
    DietId!: number;
}