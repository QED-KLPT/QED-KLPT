import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { SiteAccessService } from '../../services/site-access.service';

@Component({
  selector: 'app-passkey-gate',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './passkey-gate.html',
  styleUrl: './passkey-gate.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasskeyGate implements AfterViewInit {
  @ViewChild('passkeyInput') passkeyInputRef!: ElementRef<HTMLInputElement>;

  protected passkey = '';
  protected showPasskey = false;
  protected errorMessage = '';
  protected loading = false;

  private readonly siteAccess = inject(SiteAccessService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly changeDetector = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.passkeyInputRef?.nativeElement.focus();
  }

  protected submitPasskey(): void {
    if (!this.passkey.trim()) {
      this.errorMessage = 'Enter the passkey to access this site.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.siteAccess.requestAccess(this.passkey)
      .pipe(finalize(() => {
        this.loading = false;
        this.changeDetector.markForCheck();
      }))
      .subscribe({
        next: (response) => this.handleAccessGranted(response),
        error: (error: unknown) => this.handleAccessError(error),
      });
  }

  protected togglePasskeyVisibility(): void {
    this.showPasskey = !this.showPasskey;
  }

  protected clearPasskeyError(): void {
    this.errorMessage = '';
  }

  private handleAccessGranted(response: { accessToken: string; accessTokenExpiresAt: string }): void {
    this.siteAccess.storeAccessToken(response);
    const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] as string ?? '/';
    const safeReturnUrl = returnUrl.startsWith('/') ? returnUrl : '/';
    void this.router.navigateByUrl(safeReturnUrl);
  }

  private handleAccessError(error: unknown): void {
    this.passkey = '';
    this.showPasskey = false;

    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.errorMessage = 'The passkey is incorrect. Please try again.';
    } else {
      this.errorMessage = 'Unable to verify the passkey. Please try again.';
    }

    setTimeout(() => this.passkeyInputRef?.nativeElement.focus());
  }
}
