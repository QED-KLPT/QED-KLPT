import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavigationNodesComponent } from '../../../shared';
import { ElementModel } from '../../models/element-model';
import { KlptDomain } from '../../models/klpt-domain';
import { KlptElement } from '../../models/klpt-element';
import { KlptSubDomain } from '../../models/klpt-sub-domain';
import { SessionModel } from '../../models/session-model';
import { klptDomainStyle } from '../shared/klpt-domain-colours';
import { KlptDomainDataService } from '../shared/klpt-domain-data.service';
import { SessionManagementService } from '../shared/session-management.service';

@Component({
  selector: 'app-select-domains',
  imports: [NgStyle, RouterLink, NavigationNodesComponent],
  templateUrl: './select-domains.html',
  styleUrl: './select-domains.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDomains implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  protected readonly domainData = inject(KlptDomainDataService);
  private readonly sessionManagement = inject(SessionManagementService);

  public currentSession!: SessionModel;

  ngOnInit(): void {
    this.currentSession = this.getRouteSession();
    this.currentSession.pageIndex = 1;
  }

  ngOnDestroy(): void {
    this.sessionManagement.persistSession(this.currentSession);
  }

  private getRouteSession(): SessionModel {
    const sessionId = this.route.snapshot.paramMap.get('sessionId');

    if (!sessionId) {
      throw new Error('KLPT session id is required for select domains.');
    }

    const session = this.sessionManagement.getSession(sessionId);

    if (!session) {
      throw new Error(`KLPT session not found: ${sessionId}`);
    }

    return session;
  }

  protected domains(): KlptDomain[] {
    return this.sortByIndex(this.domainData.getAllDomains());
  }

  protected subDomains(): KlptSubDomain[] {
    const domain = this.selectedDomain();
    return domain ? this.sortByIndex(this.domainData.getAllSubDomainsByDomain(domain)) : [];
  }

  protected elements(): KlptElement[] {
    const domain = this.selectedDomain();

    if (!domain) {
      return [];
    }

    const subDomains = this.subDomains();

    if (!subDomains.length) {
      return this.sortByIndex(this.domainData.getAllElementsByDomain(domain));
    }

    const subDomain = this.selectedSubDomain();
    return subDomain ? this.sortByIndex(this.domainData.getAllElementsBySubDomain(subDomain)) : [];
  }

  protected selectedDomain(): KlptDomain | undefined {
    return this.domains().find((domain) => domain.id === this.currentSession.domain);
  }

  protected selectedSubDomain(): KlptSubDomain | undefined {
    return this.subDomains().find((subDomain) => subDomain.id === this.currentSession.subDomain);
  }

  protected selectDomain(domain: KlptDomain): void {
    if (this.currentSession.domain === domain.id) {
      return;
    }

    this.currentSession.domain = domain.id;
    this.currentSession.subDomain = undefined;
    this.currentSession.elements = [];
  }

  protected selectSubDomain(subDomain: KlptSubDomain): void {
    if (this.currentSession.subDomain === subDomain.id) {
      return;
    }

    this.currentSession.subDomain = subDomain.id;
    this.currentSession.elements = [];
  }

  protected toggleElement(element: KlptElement): void {
    if (this.isElementSelected(element)) {
      this.currentSession.elements = this.currentSession.elements.filter(
        (selectedElement) => selectedElement.id !== element.id,
      );
      return;
    }

    const nextElement: ElementModel = {
      id: element.id,
      behaviourId: undefined,
    };

    this.currentSession.elements = [...this.currentSession.elements, nextElement];
  }

  protected isElementSelected(element: KlptElement): boolean {
    return this.currentSession.elements.some((selectedElement) => selectedElement.id === element.id);
  }

  protected canContinue(): boolean {
    return this.currentSession.elements.length > 0;
  }

  protected selectionSummary(): string {
    const selectedCount = this.currentSession.elements.length;
    const domain = this.selectedDomain();
    const subDomain = this.selectedSubDomain();

    if (!domain) {
      return 'Start with a domain, then select a subdomain where one is available.';
    }

    const selectedText = selectedCount === 1 ? '1 element selected' : `${selectedCount} elements selected`;
    return `${domain.name}${subDomain ? `, ${subDomain.name}` : ''}: ${selectedText}.`;
  }

  protected itemCountLabel(count: number): string {
    return count === 1 ? '1 item' : `${count} items`;
  }

  protected panelHint(count: number, selected: boolean, allowMultiple = false): string {
    if (allowMultiple) {
      return selected ? 'Selected' : 'Tap to add';
    }

    if (count > 0) {
      return this.itemCountLabel(count);
    }

    return selected ? 'Selected' : 'Tap to select';
  }

  protected domainItemCount(domain: KlptDomain): number {
    return domain.subDomains?.length || domain.elements?.length || 0;
  }

  protected subDomainItemCount(subDomain: KlptSubDomain): number {
    return subDomain.elements.length;
  }

  protected panelStyleForDomain(domain: KlptDomain, depth = 0): Record<string, string> {
    return klptDomainStyle(domain.index, depth);
  }

  protected panelStyleForSelectedDomain(depth = 0): Record<string, string> {
    return klptDomainStyle(this.selectedDomain()?.index, depth);
  }

  private sortByIndex<T extends { index: number }>(items: T[]): T[] {
    return [...items].sort((left, right) => left.index - right.index);
  }
}
