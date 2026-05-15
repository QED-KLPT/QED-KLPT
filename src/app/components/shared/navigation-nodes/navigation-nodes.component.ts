import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
  Input,
  OnChanges,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SessionManagementService } from '../../klpt/components/shared/session-management.service';

export type NavigationNodeId = 'select-domains' | 'select-behaviours' | 'statement' | 'review';

interface NavigationNode {
  id: NavigationNodeId;
  title: string;
  description: string;
  route: string;
}

@Component({
  selector: 'app-navigation-nodes',
  imports: [RouterLink],
  templateUrl: './navigation-nodes.component.html',
  styleUrl: './navigation-nodes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationNodesComponent implements OnChanges {
  private readonly router = inject(Router);
  private readonly sessionManagement = inject(SessionManagementService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  @Input({ required: true }) sessionId!: string;
  @Input({ required: true }) currentNode!: NavigationNodeId;
  @ViewChild('clearSessionDialog') private clearSessionDialog?: ElementRef<HTMLElement>;
  @ViewChild('clearSessionTrigger') private clearSessionTrigger?: ElementRef<HTMLButtonElement>;
  protected isClearSessionModalOpen = false;
  protected stepAnnouncement = '';

  protected readonly nodes: NavigationNode[] = [
    {
      id: 'select-domains',
      title: 'Domains',
      description: 'Choose the domain, subdomain and one or more elements.',
      route: '/klpt/select-domains',
    },
    {
      id: 'select-behaviours',
      title: 'Behaviours',
      description: "Choose the behaviour that best describes the child's current learning journey.",
      route: '/klpt/select-behaviours',
    },
    {
      id: 'statement',
      title: 'Statement',
      description: 'Complete the learning progression statement and observation notes.',
      route: '/klpt/learning-progression-statement',
    },
    {
      id: 'review',
      title: 'Review',
      description: 'Review the saved statement and prepare a PDF copy.',
      route: '/klpt/review-session',
    },
  ];

  ngOnChanges(): void {
    this.queueStepAnnouncement();
  }

  protected stateFor(node: NavigationNode): 'complete' | 'current' | 'pending' {
    const currentIndex = this.nodes.findIndex((item) => item.id === this.currentNode);
    const nodeIndex = this.nodes.findIndex((item) => item.id === node.id);

    if (nodeIndex === currentIndex) {
      return 'current';
    }

    return nodeIndex < currentIndex ? 'complete' : 'pending';
  }

  protected openClearSessionModal(): void {
    this.isClearSessionModalOpen = true;
    window.setTimeout(() => this.focusFirstModalControl());
  }

  protected closeClearSessionModal(): void {
    this.isClearSessionModalOpen = false;
    window.setTimeout(() => this.clearSessionTrigger?.nativeElement.focus());
  }

  protected clearSession(): void {
    this.sessionManagement.clearSessionWorkflow(this.sessionId);
    this.isClearSessionModalOpen = false;
    void this.router.navigate(['/klpt/select-domains', this.sessionId]);
  }

  protected trapModalFocus(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeClearSessionModal();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusableElements = this.getModalFocusableElements();

    if (!focusableElements.length) {
      event.preventDefault();
      this.clearSessionDialog?.nativeElement.focus();
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

  private focusFirstModalControl(): void {
    const firstButton = this.clearSessionDialog?.nativeElement.querySelector<HTMLElement>('button:not([disabled])');
    const firstFocusable = this.getModalFocusableElements()[0];

    (firstButton ?? firstFocusable ?? this.clearSessionDialog?.nativeElement)?.focus();
  }

  private queueStepAnnouncement(): void {
    this.stepAnnouncement = '';
    this.changeDetectorRef.markForCheck();

    window.setTimeout(() => {
      const currentIndex = this.nodes.findIndex((item) => item.id === this.currentNode);
      const currentStep = this.nodes[currentIndex];

      if (!currentStep) {
        return;
      }

      this.stepAnnouncement = `KLPT step ${currentIndex + 1} of ${this.nodes.length}: ${currentStep.title}. ${currentStep.description}`;
      this.changeDetectorRef.markForCheck();
    });
  }

  private getModalFocusableElements(): HTMLElement[] {
    const dialog = this.clearSessionDialog?.nativeElement;

    if (!dialog) {
      return [];
    }

    return Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute('inert'));
  }
}
