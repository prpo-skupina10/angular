import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Welcome to Sportly</h1>
    <p>You are logged in.</p>
  `
})
export class HomeComponent {}
