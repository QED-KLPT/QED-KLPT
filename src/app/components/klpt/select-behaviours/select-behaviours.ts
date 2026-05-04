import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavigationNodesComponent } from '../../shared';
import { ElementModel } from '../models/element-model';
import { KlptBehaviour } from '../models/klpt-behaviour';
import { KlptElement } from '../models/klpt-element';
import { SessionModel } from '../models/session-model';
import { KlptDomainDataService } from '../shared/klpt-domain-data.service';
import { SessionManagementService } from '../shared/session-management.service';

interface BehaviourDetail {
  element: KlptElement;
  behaviour: KlptBehaviour;
  elementIndex: number;
}

@Component({
  selector: 'app-select-behaviours',
  imports: [NgStyle, RouterLink, NavigationNodesComponent],
  templateUrl: './select-behaviours.html',
  styleUrl: './select-behaviours.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBehaviours implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  protected readonly domainData = inject(KlptDomainDataService);
  private readonly sessionManagement = inject(SessionManagementService);

  public currentSession!: SessionModel;
  protected focusedElementId: string | undefined;
  protected focusedBehaviourId: string | undefined;

  ngOnInit(): void {
    this.currentSession = this.getRouteSession();
    this.currentSession.pageIndex = 3;
    this.focusedElementId = this.currentSession.elements[0]?.id;
    this.focusedBehaviourId = this.currentSession.elements[0]?.behaviourId;
  }

  ngOnDestroy(): void {
    this.sessionManagement.persistSession(this.currentSession);
  }

  private getRouteSession(): SessionModel {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');

    if (!sessionId) {
      throw new Error('KLPT session id is required for select behaviours.');
    }

    const session = this.sessionManagement.getSession(sessionId);

    if (!session) {
      throw new Error(`KLPT session not found: ${sessionId}`);
    }

    return session;
  }

  protected selectedElements(): KlptElement[] {
    const allElements = this.domainData
      .getAllDomains()
      .flatMap((domain) => this.domainData.getAllElementsByDomain(domain));

    return this.currentSession.elements
      .map((selectedElement) => allElements.find((element) => element.id === selectedElement.id))
      .filter((element): element is KlptElement => Boolean(element));
  }

  protected selectedDetail(): BehaviourDetail | undefined {
    const selectedElements = this.selectedElements();
    const elementIndex = Math.max(
      0,
      selectedElements.findIndex((element) => element.id === this.focusedElementId),
    );
    const element = selectedElements[elementIndex];

    if (!element) {
      return undefined;
    }

    const behaviour =
      element.behaviours.find((candidate) => candidate.id === this.focusedBehaviourId) ??
      this.selectedBehaviour(element) ??
      element.behaviours[0];

    if (!behaviour) {
      return undefined;
    }

    return {
      element,
      behaviour,
      elementIndex,
    };
  }

  protected selectedBehaviour(element: KlptElement): KlptBehaviour | undefined {
    const selectedBehaviourId = this.sessionElement(element)?.behaviourId;
    return element.behaviours.find((behaviour) => behaviour.id === selectedBehaviourId);
  }

  protected selectBehaviour(element: KlptElement, behaviour: KlptBehaviour): void {
    const existingElement = this.sessionElement(element);
    const nextElement: ElementModel = {
      id: element.id,
      behaviourId: behaviour.id,
    };

    this.currentSession.elements = existingElement
      ? this.currentSession.elements.map((selectedElement) =>
          selectedElement.id === element.id ? nextElement : selectedElement,
        )
      : [...this.currentSession.elements, nextElement];

    this.focusedElementId = element.id;
    this.focusedBehaviourId = behaviour.id;
  }

  protected elementStateLabel(element: KlptElement): string {
    return this.focusedElementId === element.id ? 'Showing details' : 'Selected element';
  }

  protected selectedElementCountLabel(count: number): string {
    return count === 1 ? '1 element selected' : `${count} elements selected`;
  }

  protected canContinue(): boolean {
    const selectedElements = this.selectedElements();
    return (
      selectedElements.length > 0 &&
      selectedElements.every((element) => Boolean(this.sessionElement(element)?.behaviourId))
    );
  }

  protected rowStyle(index: number): Record<string, string> {
    const accents = [
      { accent: '#2f65a7', glow: '#5a8fcc' },
      { accent: '#3568ad', glow: '#89aee0' },
      { accent: '#285f9e', glow: '#77a6db' },
      { accent: '#386fb5', glow: '#6fa0d6' },
    ];
    const color = accents[index % accents.length];

    return {
      '--accent': color.accent,
      '--accent-glow': color.glow,
    };
  }

  protected behaviourStyle(index: number, total: number): Record<string, string> {
    const shadeProgress = total <= 1 ? 0 : index / (total - 1);

    return {
      '--mix-light': `${Math.round(42 + shadeProgress * 42)}%`,
      '--mix-dark': `${Math.round(58 + shadeProgress * 30)}%`,
    };
  }

  protected detailStyle(detail: BehaviourDetail): Record<string, string> {
    return this.rowStyle(detail.elementIndex);
  }

  protected isSelectedBehaviour(element: KlptElement, behaviour: KlptBehaviour): boolean {
    return this.sessionElement(element)?.behaviourId === behaviour.id;
  }

  protected isFocusedBehaviour(element: KlptElement, behaviour: KlptBehaviour): boolean {
    return this.focusedElementId === element.id && this.selectedDetail()?.behaviour.id === behaviour.id;
  }

  private sessionElement(element: KlptElement): ElementModel | undefined {
    return this.currentSession.elements.find((selectedElement) => selectedElement.id === element.id);
  }
}
