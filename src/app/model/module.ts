import { ModuleType } from './moduleType';

export interface Module {
    moduleId: number;
    name: string;
    ects: number;
    type: ModuleType;
}
