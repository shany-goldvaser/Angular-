import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../models/course';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatError,],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.addCourseForm = this.fb.group({
      title: [this.course?.title, Validators.required],
      description: [this.course?.description, Validators.required],
    })
  }
  @Input() course!: Course;
  @Output() courseSave: EventEmitter<any> = new EventEmitter<any>();
  addCourseForm!: FormGroup;
  onSubmit() {
    if (this.addCourseForm.valid) {
      this.courseSave.emit(this.addCourseForm.value);
      // this.addCourseForm.reset();

    }
  }

}