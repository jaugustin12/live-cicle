export class Event {

  price: number;
  interest: number;
  eventPrivate: boolean;
  status: string;
  eventName: string;
  id: string;
  startDate: string;
  promoter: string;
  location: string;
  venue: string;
  info: string;
  lat: number;
  long: number;
  image: string;
  url: string;

  constructor(price, interest, eventPrivate, status, id, eventName, location, lat, long, startDate, endDate, info, promoter) {
    this.interest = interest;
    this.eventPrivate = eventPrivate;
    this.status = status;
    this.id = id;
    this.eventName = eventName;
    this.location = location;
    this.lat = lat;
    this.long = long;
    this.startDate = startDate;
    this.info = info;
    this.price = price;
    this.promoter = promoter;

  }
}
