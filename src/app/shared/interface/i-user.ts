export interface ILoggedInResponse {
  email_id: string;
}

export interface IUserNameResponse {
  name: string;
}

export interface IJobHistroy {
  company_name: string;
  description: string;
  location: string;
  start_date: string;
  title: string;
}

export interface IJobHistroyResponse {
  past_jobs: IJobHistroy[];
}
