import { Institution } from './institution';
import { ModuleList } from './moduleList';

export interface Degree {
    degreeId: number;
    name: string;
    ectsNeeded: number;
    type: string;
    identifier: string;
    institution: Institution;
    moduleList: ModuleList;
}
