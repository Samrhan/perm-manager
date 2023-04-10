import { Organisation } from '../organisation/organisation.entity';
import { Role } from './role.enum';

export interface FullUser {
  id: string;
  organisation: Organisation;
  lastname: string;
  firstname: string;
  priority: number;
  role: Role;
  favoriteAvailability: string[];
  availability: string[];
  unavailability: string[];
}
