export type TableWithLinks = {
  status: string;
  categories: string[];
  numberOfVisits: number;
  shortUrl: string;
  longUrl: string;
  dateCreated: Date;
  dateUpdated: Date;
  name: string | null;
};
