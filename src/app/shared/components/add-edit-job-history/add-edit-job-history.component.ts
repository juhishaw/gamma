import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IJobHistroy } from '../../interface/i-user';
import Utils from '../../utils/utils';

@Component({
  selector: 'app-add-edit-job-history',
  templateUrl: './add-edit-job-history.component.html',
  styleUrls: ['./add-edit-job-history.component.scss'],
})
export class AddEditJobHistoryComponent implements OnInit {
  public addEditJobHistoryForm: FormGroup;
  public dialogRef: MatDialogRef<any, any>;
  public data: { email_id: string; name: string };

  constructor(private _injector: Injector, private _fb: FormBuilder) {
    this.dialogRef = this._injector.get(MatDialogRef);
    this.data = this._injector.get(MAT_DIALOG_DATA, null);
  }

  ngOnInit(): void {
    this.initAddEditJobHistoryForm(this.data);
  }

  public initAddEditJobHistoryForm(data: {
    email_id: string;
    name: string;
  }): void {
    this.addEditJobHistoryForm = this._fb.group({
      company_name: [null, [Validators.required, Utils.emptySpaceValidator()]],
      title: [null, [Validators.required, Utils.emptySpaceValidator()]],
      start_date: [null, Validators.required],
      location: [null, [Validators.required, Utils.emptySpaceValidator()]],
      description: [null, [Validators.required, Utils.emptySpaceValidator()]],
      email_id: [{ value: data.email_id, disabled: true }],
    });
  }

  public closePopup(event: boolean): void {
    if (event) {
      this.dialogRef.close(this.addEditJobHistoryForm.getRawValue());
    } else {
      this.dialogRef.close();
    }
  }
}
