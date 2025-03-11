import { Component, OnInit } from '@angular/core';
import { CourseFormComponent } from '../course-form/course-form.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { LessonComponent } from '../lesson/lesson.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CourseFormComponent, LessonComponent,RouterModule,MatCardModule,
    MatButtonModule,],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  isTeacher = (sessionStorage.getItem("user") == "teacher") ? true : false;
  courseId!: string;
  course!: Course;
  flagEdit: boolean = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.courseId = id;
        this.courseService.getCourseById(+this.courseId).subscribe(
          (data: Course) => {
            this.course = data;
          },
          error => {
            alert(`Error fetching course:${error.message}`);
            this.ro.navigate(['courses']);
          }
        );
      }
    });
  }

  constructor(private route: ActivatedRoute, private ro: Router, private courseService: CourseService) { }
  edit() {
    this.flagEdit = true;
  }
  editCourse($event: any) {
    this.course.description=$event.description;
    this.course.title=$event.title;
    this.flagEdit = false;
    this.courseService.updateCourse(+this.courseId, this.course).subscribe({
      error(err) {
        alert(`Error updating course: ${err.message}`);
      },
    });
  }
  deleteCourse(): void {
    this.courseService.deleteCourse(+this.courseId).subscribe({
      next: () => {
        this.ro.navigate(['courses']);
      },
      error: (err) => {
        alert(`Error deleting course: ${err.message}`);
      }
    });
  }
  }
  



