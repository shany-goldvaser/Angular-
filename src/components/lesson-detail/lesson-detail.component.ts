import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../models/lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
import { Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LessonFormComponent } from '../lesson-form/lesson-form.component';
@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [MatCardModule,
      MatButtonModule,LessonFormComponent,],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.css'
})
export class LessonDetailComponent implements OnInit {
  isTeacher = (sessionStorage.getItem("user") == "teacher") ? true : false;
  lessonId!: string;
  lesson!: Lesson;
  flagEdit: boolean = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['lessonId'];
      if (id) {
        this.lessonId = id;
        this.lessonService.getLessonById(+this.lessonId).subscribe(
          (data: Lesson) => {
            this.lesson = data;
          },
          error => {
            alert(`Error fetching lesson:${error.message}`);
            this.location.back();
          }
        );
      }
    });
  }
  constructor(private route: ActivatedRoute, private location: Location, private lessonService: LessonService) { }
  edit() {
    this.flagEdit = true;
  }
  editlesson($event: any) {
    this.flagEdit = false;
    this.lesson.content=$event.content;
    this.lesson.title=$event.title;
    this.lessonService.updateLesson(+this.lessonId, this.lesson).subscribe({
      error(err) {
        alert(`Error updating lesson: ${err.message}`);
      },
    });
  }
  deletelesson(): void {
    this.lessonService.deleteLesson(+this.lessonId).subscribe({
      next: () => {this.location.back();},
      error: (err) => {
        alert(`Error deleting lesson: ${err.message}`);
      }
    });
  }

  }
  




