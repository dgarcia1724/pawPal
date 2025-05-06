export type Gender = "male" | "female" | "any";
export type DogSize = "small" | "medium" | "large" | "extra-large" | "any";
export type PersonalityTrait =
  | "playful"
  | "shy"
  | "energetic"
  | "calm"
  | "friendly"
  | "protective"
  | "independent"
  | "affectionate"
  | "curious"
  | "social";

export type LookingForOption =
  | "Friends"
  | "Breeding"
  | "Training partners"
  | "Walk buddies";

export interface DogAge {
  years: number;
  months: number;
  ageInMonths: number;
}

export interface UserProfile {
  id: string;
  name: string;
  photo: string;
  location: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}

export interface DogProfile {
  id: string;
  name: string;
  breed: string;
  age: DogAge;
  gender: Gender;
  size: DogSize;
  personality: PersonalityTrait[];
  lookingFor: LookingForOption[];
  photos: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MatchPreferences {
  id: string;
  userId: string;
  ageRange: {
    min: number;
    max: number;
  };
  breed: string;
  gender: Gender;
  size: DogSize;
  personality: PersonalityTrait[];
  lookingFor: LookingForOption[];
  createdAt: string;
  updatedAt: string;
}
