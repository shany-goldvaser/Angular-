import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatError, ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

    signInForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required,Validators.email]),
    password: new FormControl<string>('', [Validators.required,Validators.minLength(6)]),
});

constructor(private user: UserService,private dialogRef: MatDialogRef<SignInComponent>) { }
signIn() {
    if (this.signInForm.valid){
      this.user.signIn(this.signInForm.value.email as string,this.signInForm.value.password as string)
      .subscribe(
        (response:any) => {
            sessionStorage.setItem('user', response.role);
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('id', response.userId);
            this.dialogRef.close(true);
            this.user.isEnter=  true;
        },
        (error) => {
          console.error('Sign-in error:', error);
          alert(error.message);
          this.dialogRef.close(false);
        }
      );  
    }
}
}
