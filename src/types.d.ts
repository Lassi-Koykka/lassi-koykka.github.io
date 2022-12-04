export interface Repo {
    name: string;
    html_url: string;
    updated_at: Date;
    language: string;
    topics: string[];
    licence: {
      name: string;
    };
}
