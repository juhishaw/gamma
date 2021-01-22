import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomHttpService } from '../core/services/http.service';
import {
  IJobHistroy,
  IJobHistroyResponse,
  IUserNameResponse,
} from '../shared/interface/i-user';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private _http: CustomHttpService) {}

  public getUserName(email_id: string): Observable<IUserNameResponse> {
    return this._http.get<{ name: string }>(`user?email_id=${email_id}`).pipe(
      map((response: IUserNameResponse) => {
        return response;
      })
    );
  }

  public getJobHistory(email_id: string): Observable<IJobHistroyResponse> {
    return this._http
      .get<IJobHistroyResponse>(`user_job_history?email_id=${email_id}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public submitJobHistory(jobHistroy: IJobHistroy): Observable<{}> {
    return this._http.post<{}>(`user_job_history`, jobHistroy);
  }
}
