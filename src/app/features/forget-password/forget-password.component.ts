import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  step: WritableSignal<number> = signal<number>(1);

  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  resetControl: FormControl = new FormControl('', [Validators.required]);
  newPasswordControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  ]);

  submitEmail(e: SubmitEvent): void {
    e.preventDefault();

    if (this.emailControl.valid) {
      const data = {
        email: this.emailControl.value,
      };
      this.authService.forgotPassword(data).subscribe({
        next: (res) => {
          if (res.statusMsg === 'success') {
            console.log(res);
            this.step.set(2);
          }
        },
      });
    }
  }
  submitReset(e: SubmitEvent): void {
    e.preventDefault();

    const data = {
      resetCode: this.resetControl.value,
    };
    this.authService.verifyResetCode(data).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            console.log(res);
            this.step.set(3);
          }
        },
      });
  }
  submitNewPassword(e: SubmitEvent): void {
    e.preventDefault();

    const data = {
      email: this.emailControl.value,
      newPassword: this.newPasswordControl.value,
    };

    this.authService.resetPassword(data).subscribe({
      next: (res)=>{
        this.router.navigate(['/login'])
      }
    });
  }
}
