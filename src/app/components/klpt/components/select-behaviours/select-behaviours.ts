import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavigationNodesComponent } from '../../../shared';
import { ElementModel } from '../../models/element-model';
import { KlptBehaviour } from '../../models/klpt-behaviour';
import { KlptDomain } from '../../models/klpt-domain';
import { KlptElement } from '../../models/klpt-element';
import { SessionModel } from '../../models/session-model';
import { klptDomainStyle } from '../shared/klpt-domain-colours';
import { KlptDomainDataService } from '../shared/klpt-domain-data.service';
import { SessionManagementService } from '../shared/session-management.service';

interface BehaviourCarouselItem {
  behaviour: KlptBehaviour;
  offset: number;
  distance: number;
}

interface BehaviourDetail {
  element: KlptElement;
  behaviour: KlptBehaviour;
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
  private readonly touchStartX = new Map<string, number>();

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
      .filter((element): element is KlptElement => Boolean(element))
      .sort((left, right) => left.index - right.index);
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

  protected rowStyle(element: KlptElement): Record<string, string> {
    return klptDomainStyle(this.domainForElement(element)?.index, 2);
  }

  protected behaviourStyle(index: number, total: number): Record<string, string> {
    const shadeProgress = total <= 1 ? 0 : index / (total - 1);

    return {
      '--mix-light': `${Math.round(42 + shadeProgress * 42)}%`,
      '--mix-dark': `${Math.round(58 + shadeProgress * 30)}%`,
    };
  }

  protected carouselItems(element: KlptElement): BehaviourCarouselItem[] {
    const activeIndex = this.activeBehaviourIndex(element);

    return element.behaviours.map((behaviour, index) => {
      const offset = index - activeIndex;

      return {
        behaviour,
        offset,
        distance: Math.abs(offset),
      };
    });
  }

  protected selectedDetail(): BehaviourDetail | undefined {
    const selectedElements = this.selectedElements();
    const element =
      selectedElements.find((candidate) => candidate.id === this.focusedElementId) ??
      selectedElements[0];
    const behaviour = element ? this.activeBehaviour(element) : undefined;

    if (!element || !behaviour) {
      return undefined;
    }

    return {
      element,
      behaviour,
    };
  }

  protected isSelectedBehaviour(element: KlptElement, behaviour: KlptBehaviour): boolean {
    return this.sessionElement(element)?.behaviourId === behaviour.id;
  }

  protected isFocusedBehaviour(element: KlptElement, behaviour: KlptBehaviour): boolean {
    return this.focusedElementId === element.id && this.activeBehaviour(element)?.id === behaviour.id;
  }

  protected isActiveBehaviour(element: KlptElement, behaviour: KlptBehaviour): boolean {
    return this.activeBehaviour(element)?.id === behaviour.id;
  }

  protected carouselItemStyle(
    element: KlptElement,
    item: BehaviourCarouselItem,
    index: number,
  ): Record<string, string> {
    return {
      ...this.behaviourStyle(index, element.behaviours.length),
      ...this.rowStyle(element),
      '--offset': String(item.offset),
      '--distance': String(item.distance),
    };
  }

  protected detailStyle(detail: BehaviourDetail): Record<string, string> {
    return this.rowStyle(detail.element);
  }

  protected carouselItemState(item: BehaviourCarouselItem): 'active' | 'near' | 'far' | 'hidden' {
    if (item.offset === 0) {
      return 'active';
    }

    if (item.distance === 1) {
      return 'near';
    }

    if (item.distance === 2) {
      return 'far';
    }

    return 'hidden';
  }

  protected carouselPositionLabel(element: KlptElement): string {
    const activeIndex = this.activeBehaviourIndex(element);
    return `${activeIndex + 1} of ${element.behaviours.length}`;
  }

  protected canGoPrevious(element: KlptElement): boolean {
    return this.activeBehaviourIndex(element) > 0;
  }

  protected canGoNext(element: KlptElement): boolean {
    return this.activeBehaviourIndex(element) < element.behaviours.length - 1;
  }

  protected previousBehaviour(element: KlptElement): void {
    const activeIndex = this.activeBehaviourIndex(element);

    if (activeIndex <= 0) {
      return;
    }

    this.selectBehaviour(element, element.behaviours[activeIndex - 1]);
  }

  protected nextBehaviour(element: KlptElement): void {
    const activeIndex = this.activeBehaviourIndex(element);

    if (activeIndex >= element.behaviours.length - 1) {
      return;
    }

    this.selectBehaviour(element, element.behaviours[activeIndex + 1]);
  }

  protected onCarouselTouchStart(element: KlptElement, event: TouchEvent): void {
    this.touchStartX.set(element.id, event.changedTouches[0]?.clientX ?? 0);
  }

  protected onCarouselTouchEnd(element: KlptElement, event: TouchEvent): void {
    const startX = this.touchStartX.get(element.id);
    const endX = event.changedTouches[0]?.clientX ?? startX;
    this.touchStartX.delete(element.id);

    if (startX === undefined || endX === undefined) {
      return;
    }

    const deltaX = endX - startX;

    if (Math.abs(deltaX) < 40) {
      return;
    }

    if (deltaX < 0) {
      this.nextBehaviour(element);
    } else {
      this.previousBehaviour(element);
    }
  }

  private activeBehaviour(element: KlptElement): KlptBehaviour | undefined {
    return this.selectedBehaviour(element) ?? element.behaviours[0];
  }

  private activeBehaviourIndex(element: KlptElement): number {
    const activeBehaviour = this.activeBehaviour(element);
    return Math.max(
      0,
      element.behaviours.findIndex((behaviour) => behaviour.id === activeBehaviour?.id),
    );
  }

  private domainForElement(element: KlptElement): KlptDomain | undefined {
    return this.domainData
      .getAllDomains()
      .find((domain) =>
        this.domainData
          .getAllElementsByDomain(domain)
          .some((candidate) => candidate.id === element.id),
      );
  }

  private sessionElement(element: KlptElement): ElementModel | undefined {
    return this.currentSession.elements.find((selectedElement) => selectedElement.id === element.id);
  }
}
