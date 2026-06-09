import { DatePipe, ViewportScroller } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarModel } from '../../models/avatar.model';
import { SessionModel } from '../../models/session-model';
import { AvatarInfo, ROSTER_MAX, RosterService } from '../shared/roster.service';
import { SessionManagementService } from '../shared/session-management.service';

type ObsStep = 'idle' | 'method' | 'manual' | 'roster-setup' | 'roster-pick';

@Component({
  selector: 'app-list-sessions',
  imports: [RouterLink, DatePipe],
  templateUrl: './list-sessions.html',
  styleUrl: './list-sessions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSessions implements OnInit {
  private readonly sessionManagement = inject(SessionManagementService);
  private readonly rosterService = inject(RosterService);
  private readonly router = inject(Router);
  @ViewChild('deleteSessionDialog') private deleteSessionDialog?: ElementRef<HTMLElement>;
  @ViewChild('storageDialog') private storageDialog?: ElementRef<HTMLElement>;

  constructor(private scroll: ViewportScroller) {}

  public sessions: SessionModel[] = [];
  protected obsStep: ObsStep = 'idle';
  protected learnerCode = '';
  protected educatorName = '';
  protected learnerCodeError = '';
  protected educatorNameError = '';
  protected childCount = '';
  protected childCountError = '';
  protected roster: AvatarModel[] = [];
  protected selectedAvatar: AvatarModel | null = null;
  protected isStorageModalOpen = false;
  protected storageSnapshot = '(empty)';
  protected bulbTooltipVisible = false;
  private readonly BULB_LONG_PRESS_MS = 500;
  private bulbLongPressTimer: number | undefined;
  private modalTrigger: HTMLElement | undefined;
  protected pendingDelete:
    | { type: 'session'; sessionId: string; learnerCode: string }
    | { type: 'all' }
    | undefined;

  protected get isFormVisible(): boolean {
    return this.obsStep !== 'idle';
  }

  protected get sessionCountLabel(): string {
    return `Saved sessions (${this.sessions.length})`;
  }

  protected get deleteConfirmationTitle(): string {
    return this.pendingDelete?.type === 'all' ? 'Delete all sessions?' : 'Delete this session?';
  }

  protected get deleteConfirmationMessage(): string {
    if (this.pendingDelete?.type === 'session') {
      return `This will permanently delete learner ${this.pendingDelete.learnerCode || 'this session'}.`;
    }

    return `This will permanently delete all ${this.sessions.length} saved sessions.`;
  }

  public get groupedSessions(): [string, SessionModel[]][] {
    const groups: Record<string, SessionModel[]> = {};

    for (const session of this.sessions) {
      const key = session.educatorName || 'Unknown observer';
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(session);
    }

    return Object.entries(groups);
  }

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);

    this.sessionManagement.deleteAllExpiredSessions();
    const all = this.sessionManagement.getAllSessions();
    this.sessions = [...all].sort((a, b) => {
      const aDate = a.updated ?? a.created;
      const bDate = b.updated ?? b.created;
      return bDate.getTime() - aDate.getTime();
    });
    this.roster = this.rosterService.load();
  }

  protected onToggleFormVisibility(): void {
    if (this.obsStep !== 'idle') {
      this.resetObsForm();
    } else {
      this.obsStep = 'method';
    }
  }

  protected onSelectMethod(method: 'manual' | 'avatar'): void {
    if (method === 'manual') {
      this.obsStep = 'manual';
    } else {
      this.obsStep = this.roster.length > 0 ? 'roster-pick' : 'roster-setup';
    }
  }

  protected onBackToMethod(): void {
    this.learnerCode = '';
    this.learnerCodeError = '';
    this.educatorNameError = '';
    this.childCount = '';
    this.childCountError = '';
    this.selectedAvatar = null;
    this.obsStep = 'method';
  }

  public onLearnerCodeInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.learnerCode = value.replace(/\D/g, '').slice(0, 3);
    this.learnerCodeError =
      this.learnerCode.length > 0 && this.learnerCode.length < 3 ? 'Learner code must be 3 digits' : '';
  }

  public onEducatorNameInput(event: Event): void {
    this.educatorName = (event.target as HTMLInputElement).value;
    this.educatorNameError = '';
  }

  public onChildCountInput(event: Event): void {
    this.childCount = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 2);
    this.childCountError = '';
  }

  public onGenerateRoster(): void {
    const n = parseInt(this.childCount, 10);
    if (!n || n < 1) {
      this.childCountError = 'Please enter a number between 1 and ' + ROSTER_MAX;
      return;
    }
    if (n > ROSTER_MAX) {
      this.childCountError = `Maximum ${ROSTER_MAX} children`;
      return;
    }
    this.roster = this.rosterService.generateAvatars(n);
    this.rosterService.save(this.roster);
    this.obsStep = 'roster-pick';
  }

  public onSelectAvatar(avatar: AvatarModel): void {
    this.selectedAvatar = avatar;
  }

  protected isAvatarInUse(avatar: AvatarModel): boolean {
    const name = this.educatorName.trim().toLowerCase();
    return this.sessions.some(
      (s) =>
        (s.educatorName ?? '').toLowerCase() === name &&
        s.learnerCode === avatar.label,
    );
  }

  public onResetRoster(): void {
    this.selectedAvatar = null;
    this.childCount = '';
    this.childCountError = '';
    this.obsStep = 'roster-setup';
  }

  protected getAvatarInfo(learnerCode: string): AvatarInfo | null {
    return this.rosterService.getAvatarInfo(learnerCode);
  }

  public onPrintRoster(): void {
    const win = window.open('', '_blank');
    if (!win) {
      return;
    }
    win.document.open();
    win.document.write(this.buildPrintHtml());
    win.document.close();
    win.focus();
    win.onafterprint = () => win.close();
    window.setTimeout(() => win.print(), 300);
  }

  public onCreateSession(): void {
    this.educatorNameError = !this.educatorName.trim() ? "Observer's name is required" : '';

    if (this.obsStep === 'manual') {
      this.learnerCodeError = this.learnerCode.length !== 3 ? 'Learner code must be 3 digits' : '';
      if (this.learnerCodeError || this.educatorNameError) {
        return;
      }
      this.createAndNavigate(this.learnerCode);
      return;
    }

    if (this.obsStep === 'roster-pick' && this.selectedAvatar) {
      if (this.educatorNameError) {
        return;
      }
      this.createAndNavigate(this.selectedAvatar.label);
    }
  }

  protected sessionRoute(session: SessionModel): string[] {
    const routeByPageIndex: Record<number, string> = {
      1: 'select-domains',
      2: 'select-behaviours',
      3: 'learning-progression-statement',
      4: 'review-session',
    };
    const stepRoute = routeByPageIndex[session.pageIndex] ?? routeByPageIndex[1];

    return ['/klpt', stepRoute, session.id];
  }

  public openDeleteSessionModal(session: SessionModel, event?: Event): void {
    this.modalTrigger = event?.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;
    this.pendingDelete = {
      type: 'session',
      sessionId: session.id,
      learnerCode: session.learnerCode,
    };
    window.setTimeout(() => this.focusFirstModalButton(this.deleteSessionDialog));
  }

  public openDeleteAllModal(event?: Event): void {
    if (!this.sessions.length) {
      return;
    }

    this.modalTrigger = event?.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;
    this.pendingDelete = { type: 'all' };
    window.setTimeout(() => this.focusFirstModalButton(this.deleteSessionDialog));
  }

  protected closeDeleteModal(): void {
    this.pendingDelete = undefined;
    window.setTimeout(() => this.restoreModalTriggerFocus());
  }

  protected confirmDelete(): void {
    if (!this.pendingDelete) {
      return;
    }

    if (this.pendingDelete.type === 'all') {
      for (const session of this.sessions) {
        this.sessionManagement.deleteSession(session.id);
      }
      this.sessions = [];
      this.pendingDelete = undefined;
      return;
    }

    const sessionId = this.pendingDelete.sessionId;
    this.sessionManagement.deleteSession(sessionId);
    this.sessions = this.sessions.filter((session) => session.id !== sessionId);
    this.pendingDelete = undefined;
  }

  protected openStorageModal(event?: Event): void {
    this.modalTrigger = event?.currentTarget instanceof HTMLElement ? event.currentTarget : undefined;
    this.storageSnapshot = this.sessionManagement.getStorageSnapshot();
    this.isStorageModalOpen = true;
    window.setTimeout(() => this.focusFirstModalButton(this.storageDialog));
  }

  protected closeStorageModal(): void {
    this.isStorageModalOpen = false;
    window.setTimeout(() => this.restoreModalTriggerFocus());
  }

  protected trapDeleteModalFocus(event: Event): void {
    this.trapModalFocus(event as KeyboardEvent, this.deleteSessionDialog, () => this.closeDeleteModal());
  }

  protected trapStorageModalFocus(event: Event): void {
    this.trapModalFocus(event as KeyboardEvent, this.storageDialog, () => this.closeStorageModal());
  }

  protected onBulbHover(show: boolean): void {
    this.bulbTooltipVisible = show;
  }

  protected onBulbLongPressStart(): void {
    this.bulbLongPressTimer = window.setTimeout(() => {
      this.bulbTooltipVisible = true;
    }, this.BULB_LONG_PRESS_MS);
  }

  protected onBulbLongPressEnd(): void {
    if (this.bulbLongPressTimer) {
      window.clearTimeout(this.bulbLongPressTimer);
      this.bulbLongPressTimer = undefined;
    }
  }

  private createAndNavigate(learnerCode: string): void {
    const session = this.sessionManagement.createSession();
    session.learnerCode = learnerCode;
    session.educatorName = this.educatorName.trim();
    session.pageIndex = 1;
    this.sessionManagement.persistSession(session);
    void this.router.navigateByUrl(`/klpt/select-domains/${session.id}`);
  }

  private resetObsForm(): void {
    this.obsStep = 'idle';
    this.learnerCode = '';
    this.educatorName = '';
    this.learnerCodeError = '';
    this.educatorNameError = '';
    this.childCount = '';
    this.childCountError = '';
    this.selectedAvatar = null;
  }

  private buildPrintHtml(): string {
    const tiles = this.roster
      .map(
        (a) => `
      <div class="tile" style="--c:${a.colorHex}">
        <i class="fa-solid ${a.iconClass} tile-icon" aria-hidden="true"></i>
        <div class="word">${a.label}</div>
      </div>`,
      )
      .join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Class Roster</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:system-ui,sans-serif;padding:1.5rem;color:#1e293b}
  h1{font-size:1.1rem;font-weight:800;margin-bottom:1.25rem;color:#26364b}
  .grid{display:grid;grid-template-columns:repeat(5,1fr);gap:0.875rem}
  .tile{
    background:#fff;border:1px solid #e2e8f0;
    border-radius:10px;color:#1e293b;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    gap:0.3rem;min-height:6.5rem;padding:0.875rem 0.5rem 0.75rem;text-align:center;
    break-inside:avoid;page-break-inside:avoid
  }
  .tile-icon{font-size:1.6rem;color:var(--c)}
  .word{font-size:0.85rem;font-weight:800;line-height:1.2;color:#1e293b}
  @media print{
    body{padding:0.5rem}
    .grid{grid-template-columns:repeat(5,1fr)}
  }
</style>
</head>
<body>
<h1>Class Roster — ${this.roster.length} learner${this.roster.length !== 1 ? 's' : ''}</h1>
<div class="grid">${tiles}</div>
</body>
</html>`;
  }

  private trapModalFocus(
    event: KeyboardEvent,
    dialogRef: ElementRef<HTMLElement> | undefined,
    closeModal: () => void,
  ): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = this.getModalFocusableElements(dialogRef);

    if (!focusableElements.length) {
      event.preventDefault();
      dialogRef?.nativeElement.focus();
      return;
    }

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private focusFirstModalButton(dialogRef: ElementRef<HTMLElement> | undefined): void {
    const firstButton = dialogRef?.nativeElement.querySelector<HTMLElement>('button:not([disabled])');
    const firstFocusable = this.getModalFocusableElements(dialogRef)[0];

    (firstButton ?? firstFocusable ?? dialogRef?.nativeElement)?.focus();
  }

  private getModalFocusableElements(dialogRef: ElementRef<HTMLElement> | undefined): HTMLElement[] {
    const dialog = dialogRef?.nativeElement;

    if (!dialog) {
      return [];
    }

    return Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute('inert'));
  }

  private restoreModalTriggerFocus(): void {
    this.modalTrigger?.focus();
    this.modalTrigger = undefined;
  }
}
