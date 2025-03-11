import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Lesson } from '../../models/lesson';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-lesson-form',
  standalone: true,
  imports: [ReactiveFormsModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatDialogModule,
      MatError,],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css'
})
export class LessonFormComponent {
constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.LessonForm = this.fb.group({
      title: [this.lesson?.title, Validators.required],
      content: [this.lesson?.content, Validators.required],
    })
  }
  @Input() lesson!: Lesson;
  @Output() lessonSave: EventEmitter<any> = new EventEmitter<any>();
  LessonForm!: FormGroup;
  onSubmit() {
    if (this.LessonForm.valid) {
      this.lessonSave.emit(this.LessonForm.value);
    }
  }

}
