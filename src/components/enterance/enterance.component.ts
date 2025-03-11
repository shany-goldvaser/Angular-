import { Component } from '@angular/core';
import { SignInComponent } from '../sign-in/sign-in.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { CourseComponent } from '../course/course.component';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-enterance',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatButton,RouterOutlet,],
  templateUrl: './enterance.component.html',
  styleUrl: './enterance.component.css'
})
export class EnteranceComponent {
  constructor(private dialog: MatDialog ,private routes: Router) { }
  openComponent = false;
  openSignInDialog() {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '330px',
      height: 'auto',
      panelClass: 'centered-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openComponent = true;
        this.routes.navigate(['courses']);
      }
    });
  }
  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '330px',
      height: 'auto',
      panelClass: 'centered-dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openComponent = true;
        this.routes.navigate(['courses']);
      }

    });
  }

}