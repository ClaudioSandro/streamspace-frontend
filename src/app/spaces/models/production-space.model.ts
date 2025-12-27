export type SpaceType = 'PODCAST' | 'STREAMING' | 'PHOTO_VIDEO';

export interface ProductionSpace {
  id: number;
  ownerId: number;
  name: string;
  description: string;
  type: SpaceType;
  status: string;
  city: string;
  district: string;
  addressLine: string;
  hourlyRateAmount: number;
  hourlyRateCurrency: string;
  maxPeople: number;
  rules: string;
}
