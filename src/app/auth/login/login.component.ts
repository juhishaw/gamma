import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouteConstants } from '../../core/constants/route-constants';
import { ILoggedInResponse } from '../../shared/interface/i-user';
import { SharedService } from '../../shared/shared.service';
import Utils from '../../shared/utils/utils';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isLoaderActive = false;
  public hide = true;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  public initLoginForm(): void {
    this.loginForm = this._fb.group({
      email_id: [
        null,
        [Validators.required, Utils.emptySpaceValidator(), Validators.email],
      ],
      password: [null, [Validators.required, Utils.emptySpaceValidator()]],
    });
  }

  get loginFormControl(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public startLoading(): void {
    this.isLoaderActive = true;
  }

  public stopLoading(): void {
    this.isLoaderActive = false;
  }

  public redirectToSingup(): void {
    this._router.navigate([RouteConstants.SIGN_UP]);
  }

  public loginUser(): void {
    this.startLoading();
    const subscription = this._authService
      .loginUser(this.loginForm.value)
      .subscribe(
        (response: ILoggedInResponse) => {
          this._router.navigate([RouteConstants.WORK_EXPERIENCE]);
        },
        (error) => {
          this.handleError(error);
        }
      );
    subscription.add(() => this.stopLoading());
  }

  private handleError(error: string): void {
    this._sharedService.openErrorSnackBar(error);
  }
}
