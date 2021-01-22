import { Component, OnInit } from '@angular/core';
import { LocalStorageConstants } from '../../core/constants/localstorage.constants';
import {
  IJobHistroy,
  IJobHistroyResponse,
  IUserNameResponse,
} from '../../shared/interface/i-user';
import { HomeService } from '../home.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditJobHistoryComponent } from '../../shared/components/add-edit-job-history/add-edit-job-history.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { MatTableDataSource } from '@angular/material/table';
import { JobHistoryTable } from '../../shared/enums/job-history-table.enum';

export interface PeriodicElement {
  company: string;
  title: number;
  location: number;
  month_year: string;
  description: string;
}

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss'],
})
export class WorkExperienceComponent implements OnInit {
  public userName: string;
  public jobHistory: IJobHistroy[];
  public dataSource: MatTableDataSource<IJobHistroy> = new MatTableDataSource<IJobHistroy>();
  public displayedColumns: string[] = [
    JobHistoryTable.COMAPNY_NAME,
    JobHistoryTable.TITLE,
    JobHistoryTable.LOCATION,
    JobHistoryTable.START_DATE,
    JobHistoryTable.DESCRIPTION
  ];
  public isDataLoading = true;

  constructor(private _homeService: HomeService, private _dialog: MatDialog) {}

  ngOnInit(): void {
    this.isDataLoading = true;
    this.getUserName();
    this.getJobHistory();
  }

  public getUserName(): void {
    this._homeService
      .getUserName(localStorage.getItem(LocalStorageConstants.EMAIL_ID))
      .subscribe((response: IUserNameResponse) => {
        this.userName = response.name;
      });
  }

  public getJobHistory(): void {
    this.isDataLoading = true;
    this._homeService
      .getJobHistory(localStorage.getItem(LocalStorageConstants.EMAIL_ID))
      .subscribe((response: IJobHistroyResponse) => {
        this.jobHistory = response.past_jobs;
        this.isDataLoading = false;
        this.dataSource = new MatTableDataSource<IJobHistroy>(this.jobHistory);
      });
  }

  public openAddJobHistoryPopup(): void {
    const dialogRef = this._dialog.open(AddEditJobHistoryComponent, {
      width: '440px',
      disableClose: true,
      scrollStrategy: new NoopScrollStrategy(),
      data: {
        email_id: localStorage.getItem(LocalStorageConstants.EMAIL_ID),
        name: this.userName,
      },
    });
    dialogRef.afterClosed().subscribe((response: IJobHistroy) => {
      this.postJobHistory(response);
    });
  }

  public postJobHistory(data: IJobHistroy) {
    this._homeService
      .submitJobHistory(data)
      .subscribe((response: {}) => this.getJobHistory());
  }
}
