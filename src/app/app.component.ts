import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EnteranceComponent } from "../components/enterance/enterance.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EnteranceComponent, RouterOutlet,RouterLink,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'online-course-project';
}
