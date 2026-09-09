/**
 * Domain types and models for Layla Rafaella - Adestramento Canino & Comportamento
 */

export type Theme = 'light' | 'dark';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  features: string[];
  idealFor: string;
  format: string;
  iconName: string;
  featured?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  tutorName: string;
  dogName: string;
  dogBreed: string;
  serviceType: string;
  story: string;
  rating: number;
  result: string;
  photoUrl?: string;
  printUrl?: string;
  date?: string;
}

export interface ContactInfo {
  name: string;
  title: string;
  instagramHandle: string;
  instagramUrl: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  location: string;
  hours: string;
}
