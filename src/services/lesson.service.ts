import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Lesson } from '../models/lesson';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private lessonSubject:BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
  lessons$:Observable<Lesson[]> = this.lessonSubject.asObservable();
  private apiUrl: string = `http://localhost:3000/api/courses`;
   courseId!: string;
  constructor(private http: HttpClient) {
    console.log('im in the ctor of LessonService');
    console.log(this.courseId);

  }

  private loadLessons(id:string): void {
    this.courseId = id;
    this.http.get<Lesson[]>(this.apiUrl+`/${this.courseId}/lessons`).subscribe(less=>{
      this.lessonSubject.next(less); 
    });
  }

  getLessons(id:string): Observable<Lesson[]> {
    this.loadLessons(id); 
    return this.lessons$; // Return the observable from BehaviorSubject
  }

  getLessonById(lessonId: number): Observable<Lesson> {
    return this.http.get<Lesson>(this.apiUrl+`/${this.courseId}/lessons/${lessonId}`);
  }

  createLesson(lessonData: { title: string; content: string; courseId: number }): Observable<{
    message: string;
    lessonId: number;
  }> {
    return this.http.post<{
      message: string;
      lessonId: number;
    }>(this.apiUrl+`/${this.courseId}/lessons`, lessonData).pipe(
      tap(response => {
        this.loadLessons(this.courseId);
      })
    );
  }

  updateLesson(lessonId: number, lessonData: { title: string; content: string }): Observable<{
    message: string;
  }> {
    return this.http.put<{
      message: string;
    }>(this.apiUrl+`/${this.courseId}/lessons/${lessonId}`, lessonData).pipe(
      tap(response => {
        // Reload lessons after update
        this.loadLessons(this.courseId);
      })
    );
  }

  deleteLesson(lessonId: number): Observable<{
    message: string;
  }> {
    return this.http.delete<{
      message: string;
    }>(this.apiUrl+`/${this.courseId}/lessons/${lessonId}`).pipe(
      tap(response => {
        // Reload lessons after deletion
        this.loadLessons(this.courseId);
      })
    );
  }
}
