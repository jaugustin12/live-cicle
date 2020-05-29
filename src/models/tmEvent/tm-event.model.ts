export class TmEvent {

  eventName: string;
  startDate: string;
  promoter: string;
  location: string;
  price: number;
  venue: string;
  info: string;
  lat: number;
  long: number;
  image: string;
  url: string;

  constructor(eventName, startDate, promoter, location, price, venue, info, lat, long, image, url) {
    this.eventName = eventName;
    this.startDate = startDate;
    this.promoter = promoter;
    this.location = location;
    this.price = price;
    this.venue = venue;
    this.info = info;
    this.lat = lat;
    this.long = long;
    this.image = image;
    this.url = url;

  }

}
