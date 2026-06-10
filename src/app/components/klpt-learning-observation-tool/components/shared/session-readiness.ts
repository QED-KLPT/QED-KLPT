import { KlptDomainDataService } from './klpt-domain-data.service';
import { SessionModel } from '../../models/session-model';

export function hasSelectedElements(session: SessionModel | undefined): boolean {
  return Boolean(session?.domain && session.elements.length > 0);
}

export function hasSelectedBehaviours(
  session: SessionModel | undefined,
  domainData: KlptDomainDataService,
): boolean {
  if (!hasSelectedElements(session)) {
    return false;
  }

  const allElements = domainData
    .getAllDomains()
    .flatMap((domain) => domainData.getAllElementsByDomain(domain));

  return session!.elements.every((selectedElement) => {
    const element = allElements.find((candidate) => candidate.id === selectedElement.id);

    return Boolean(
      element?.behaviours.some((behaviour) => behaviour.id === selectedElement.behaviourId),
    );
  });
}
