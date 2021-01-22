import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToasterComponent } from './components/toaster/toaster.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private snackBar: MatSnackBar) {}

  public openErrorSnackBar(error: string): void {
    this.snackBar.openFromComponent(ToasterComponent, {
      data: error,
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
