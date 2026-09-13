export interface ScentItem {
  id: string;
  name: string;
  vietnameseName: string;
  tag: string;
  mood: string;
  description: string;
  suitableFor: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  color: string;
}

export interface SpaceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  suggestedScent: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  content: string;
  space: string;
  avatarLetter: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  accent: string;
}

export interface OrderData {
  customerName: string;
  phoneNumber: string;
  address: string;
  selectedColor: string;
  selectedScent: string;
  quantity: number;
  paymentMethod: 'cod' | 'banking';
  note: string;
}
