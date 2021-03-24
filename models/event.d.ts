export interface Event {
  id: string | number;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export interface EventComment {
  id?: string;
  email: string;
  name: string;
  text: string;
}
