declare class Place {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: { lat: number; lng: number };
}

export default Place;
