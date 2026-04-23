import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent, FooterLink, FooterTag } from '../shared/card/card.component';

@Component({
  selector: 'app-testing-cards',
  imports: [CardComponent],
  templateUrl: './testing-cards.html',
  styleUrl: './testing-cards.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingCards {
  multiActionLinks: FooterLink[] = [
    { label: 'Card link one', href: '#', icon: 'fa-light fa-directions' },
    { label: 'Card link two', href: '#', icon: 'fa-light fa-car-side' },
    { label: 'Card link three', href: '#', icon: 'fa-light fa-stethoscope' },
  ];

  multiActionLinksPlain: FooterLink[] = [
    { label: 'Card link one', href: '#' },
    { label: 'Card link two', href: '#' },
    { label: 'Card link three', href: '#' },
  ];

  tagList: FooterTag[] = [
    { label: 'Tag 1', href: '#?tag=tag_1' },
    { label: 'Tag 2', href: '#?tag=tag_2' },
    { label: 'Tag 3', href: '#?tag=tag_3' },
  ];

  featureCardLinks: FooterLink[] = [
    { label: 'Card link one', href: '#' },
    { label: 'Card link two', href: '#' },
    { label: 'Card link three', href: '#' },
  ];

  imageUrl1 = 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=600&h=300&fit=crop';
  imageUrl2 = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop';
  imageUrl3 = 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=500&fit=crop';
}
