import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../models/lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../services/lesson.service';
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
      const id = params['id'];
      if (id) {
        this.lessonId = id;
        this.lessonService.getLessonById(+this.lessonId).subscribe(
          (data: Lesson) => {
            this.lesson = data;
          },
          error => {
            console.error('Error fetching lesson:', error);
            alert(`Error fetching lesson:${error.message}`);
            this.ro.navigate(['lesson'])
          }
        );
      }
    });
  }
  constructor(private route: ActivatedRoute, private ro: Router, private lessonService: LessonService) { }
  edit() {
    console.log(this.lesson);

    this.flagEdit = true;
  }
  editlesson($event: any) {
    this.lesson = $event;
    this.lessonService.updateLesson(+this.lessonId, this.lesson).subscribe({
      next: (response: any) => {
        console.log('lesson updated:', response);
        // Reset the new lesson form
        // this.newlesson = { id: 0, title: '', description: '', teacherId: 0 };
      }
    });
    this.flagEdit = false;
  }
  deletelesson(): void {
    this.lessonService.deleteLesson(+this.lessonId).subscribe({
      next: (response) => {
      },
      error: (err) => {
        alert(`Error deleting lesson: ${err.message}`);
      }
    });
  }

  }
  




