import { SpaceType } from './production-space.model';

export interface UpdateSpaceRequest {
  name: string;
  description: string;
  type: SpaceType;
  city: string;
  district: string;
  addressLine: string;
  hourlyRateAmount: number;
  hourlyRateCurrency: string;
  maxPeople: number;
  rules: string;
}
