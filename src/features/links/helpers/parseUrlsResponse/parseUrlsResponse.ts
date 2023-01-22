type UrlsResponse = {
  status: string;
  categories: string[];
  numberOfVisits: number;
  shortUrl: string;
  longUrl: string;
  dateCreated: Date;
  dateUpdated: Date;
  name: string | null;
};

export default UrlsResponse;
