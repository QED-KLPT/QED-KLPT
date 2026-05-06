import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { KlptBehaviour } from '../../models/klpt-behaviour';
import { KlptDomain } from '../../models/klpt-domain';
import { KlptDomainsData } from '../../models/klpt-domains-data';
import { KlptElement } from '../../models/klpt-element';
import { KlptSubDomain } from '../../models/klpt-sub-domain';

type KlptModelReference<T extends { id: string }> = T | string;

@Injectable({
  providedIn: 'root',
})
export class KlptDomainDataService {
  private readonly domainsUrl = 'assets/klpt/data/domains.json';
  private readonly domains = signal<KlptDomain[]>([]);

  constructor(private readonly http: HttpClient) {
    this.loadDomains();
  }

  getAllDomains(): KlptDomain[] {
    return this.domains();
  }

  getAllSubDomainsByDomain(domain: KlptModelReference<KlptDomain>): KlptSubDomain[] {
    return this.resolveDomain(domain)?.subDomains ?? [];
  }

  getAllElementsByDomain(domain: KlptModelReference<KlptDomain>): KlptElement[] {
    const resolvedDomain = this.resolveDomain(domain);

    if (!resolvedDomain) {
      return [];
    }

    return [
      ...(resolvedDomain.elements ?? []),
      ...(resolvedDomain.subDomains?.flatMap((subDomain) => subDomain.elements) ?? []),
    ];
  }

  getAllElementsBySubDomain(
    subDomain: KlptModelReference<KlptSubDomain>,
  ): KlptElement[] {
    return this.resolveSubDomain(subDomain)?.elements ?? [];
  }

  getAllBehavioursByElement(element: KlptModelReference<KlptElement>): KlptBehaviour[] {
    return this.resolveElement(element)?.behaviours ?? [];
  }

  private loadDomains(): void {
    this.http.get<KlptDomainsData>(this.domainsUrl).subscribe({
      next: (data) => this.domains.set(data.domains),
      error: () => this.domains.set([]),
    });
  }

  private resolveDomain(domain: KlptModelReference<KlptDomain>): KlptDomain | undefined {
    if (typeof domain !== 'string') {
      return domain;
    }

    return this.domains().find((candidate) => candidate.id === domain);
  }

  private resolveSubDomain(
    subDomain: KlptModelReference<KlptSubDomain>,
  ): KlptSubDomain | undefined {
    if (typeof subDomain !== 'string') {
      return subDomain;
    }

    return this.domains()
      .flatMap((domain) => domain.subDomains ?? [])
      .find((candidate) => candidate.id === subDomain);
  }

  private resolveElement(
    element: KlptModelReference<KlptElement>,
  ): KlptElement | undefined {
    if (typeof element !== 'string') {
      return element;
    }

    return this.domains()
      .flatMap((domain) => this.getAllElementsByDomain(domain))
      .find((candidate) => candidate.id === element);
  }
}
