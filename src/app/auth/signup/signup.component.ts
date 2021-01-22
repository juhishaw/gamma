import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageConstants } from '../../core/constants/localstorage.constants';
import { RouteConstants } from '../../core/constants/route-constants';
import { ILoggedInResponse } from '../../shared/interface/i-user';
import { SharedService } from '../../shared/shared.service';
import Utils from '../../shared/utils/utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public isLoaderActive = false;
  public hide = true;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.initSignupForm();
  }

  public initSignupForm(): void {
    this.signupForm = this._fb.group({
      email_id: [
        null,
        [Validators.required, Utils.emptySpaceValidator(), Validators.email],
      ],
      name: [
        null,
        [
          Validators.required,
          Utils.emptySpaceValidator(),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      password: [null, [Validators.required, Utils.emptySpaceValidator()]],
    });
  }

  get signupFormControl(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  public startLoading(): void {
    this.isLoaderActive = true;
  }

  public stopLoading(): void {
    this.isLoaderActive = false;
  }

  public redirectToSingin(): void {
    this._router.navigate([RouteConstants.LOGIN]);
  }

  public signUpUser(): void {
    this.startLoading();
    const subscription = this._authService
      .signUpUser(this.signupForm.value)
      .subscribe(
        (response: ILoggedInResponse) => {
          localStorage.setItem(
            LocalStorageConstants.EMAIL_ID,
            this.signupForm.get('email_id').value
          );
          this._router.navigate([RouteConstants.WORK_EXPERIENCE]);
        },
        (error: string) => {
          this.handleError(error);
        }
      );
    subscription.add(() => this.stopLoading());
  }

  private handleError(error: string): void {
    this._sharedService.openErrorSnackBar(error);
  }
}
