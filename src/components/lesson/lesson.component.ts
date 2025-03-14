import { Component, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../models/lesson';
import { LessonService } from '../../services/lesson.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule, MatNavList, MatListItem } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CourseFormComponent } from '../course-form/course-form.component';
import { LessonDetailComponent } from '../lesson-detail/lesson-detail.component';
import { LessonFormComponent } from '../lesson-form/lesson-form.component';
@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [AsyncPipe,
    MatListModule,
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule, RouterOutlet,
    RouterLink,
    MatButton,
    LessonFormComponent,
    RouterOutlet,],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent {

  flagAdd: boolean = false;
  isTeacher: boolean = (sessionStorage.getItem("user") == "teacher") ? true : false;
  lessons$!: Observable<Lesson[]>;
  newLesson: { id: number, title: string; content: string; courseId: number } = { id: 0, title: '', content: '', courseId: 0 };
  @Input() courseId!: string;
  constructor(private lessonService: LessonService) { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['courseId']) {
      // Logic to refresh or fetch data based on the new courseId
      console.log('courseId changed:', this.courseId);
      this.lessons$ = this.lessonService.getLessons(this.courseId);
    }
  }
  ngOnInit(): void {
    this.lessons$ = this.lessonService.getLessons(this.courseId);
  }
  add() {
    this.flagAdd = true;
  }
  addLesson(event: any): void {
    this.flagAdd = false;
    this.newLesson = event;
    this.lessonService.createLesson(this.newLesson).subscribe({
      next: () => {
        this.newLesson = { id: 0, title: '', content: '', courseId: 0 };
      },
      error: (err: any) => {
        alert(`Error creating lesson:, ${err.message}`);
      }
    });
  }
}
