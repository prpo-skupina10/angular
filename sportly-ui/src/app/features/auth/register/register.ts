import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject, Observable, switchMap, tap, catchError, of, startWith } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {

  form!: FormGroup;

  private submit$ = new Subject<void>();
  result$!: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.result$ = this.submit$.pipe(
      switchMap(() =>
        this.authService.register(this.form.value).pipe(
          tap(() => this.router.navigate(['/login'])),
          catchError(err =>
            of(err?.error?.message || 'Registration failed')
          )
        )
      ),
      startWith('')
    );
  }

  submit() {
    if (this.form.invalid) return;
    this.submit$.next();
  }
}