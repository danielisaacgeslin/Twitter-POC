export interface TweetModel {
  text: string;
  truncated: boolean;
  created_at: string;
  id: number;
  id_str: string;
  entities: {
    hashtags: { text: string }[]
  };
  user: {
    name: string;
    profile_image_url: string;
    profile_banner_url: string;
  };
}
