import { Component, forwardRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ValidatorFn, NG_VALUE_ACCESSOR, FormBuilder } from '@angular/forms';
import { UserRole } from '../../models/user';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatError,
    MatRadioModule,],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm!:FormGroup;
  userRoles: string[] = Object.values(UserRole)
  constructor(private user: UserService, private fb :FormBuilder,private dialogRef: MatDialogRef<SignUpComponent>) {
    this.signUpForm=fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      role:['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  signUp() {
    if (this.signUpForm.valid) {
       this.user.signUp(
        this.signUpForm.value.name as string,
        this.signUpForm.value.email as string,
        this.signUpForm.value.password as string,
        this.signUpForm.value.role as string
      ).subscribe(
          (response:any) => {
            console.log('User signed up:', response);
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('user', response.role);
            sessionStorage.setItem('id', response.id);
            this.dialogRef.close(true);
            this.user.isEnter=  true;
          },
          (error) => {
            console.error('Sign-up error:', error);
            alert(error.message);
            this.dialogRef.close(false);
          }
        );
      
      
    }
  }
}

