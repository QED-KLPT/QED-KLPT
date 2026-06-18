import { ViewportScroller } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { YoutubePlayerModule } from '../shared/youtube-player/youtube-player.module';
import { DomainAssetModeService } from '../../services/domain-asset-mode.service';

type DesignCard = {
  title: string;
  description: string;
  url: string;
  imageAlt: string;
  background: string;
  hoverBorderColor: string;
  imageSrc: string;
};

@Component({
  selector: 'app-social-and-emotional-learning',
  imports: [RouterLink, YoutubePlayerModule],
  templateUrl: './social-and-emotional-learning.html',
  styleUrl: './social-and-emotional-learning.scss',
})
export class SocialAndEmotionalLearning implements OnInit {
  protected readonly domainAssets = inject(DomainAssetModeService);
  
  socialAndEmotionalLearningTranscript: string = '';

  constructor(
    private scroll: ViewportScroller,
    private http: HttpClient,
  ) {
    this.http.get('assets/content/transcripts/social-and-emotional-learning/soc-emot-learning.txt', { responseType: 'text' }).subscribe(t => this.socialAndEmotionalLearningTranscript = t);
  }

  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
  }

  protected readonly practiceSupports = {
    pdfLabel: 'Download social and emotional learning practice supports (PDF, 1.3MB)',
    pdfPath: 'assets/content/pdfs/qklg-principle-rrls-poster.pdf',
  };

  protected readonly cards: DesignCard[] = [
    {
      title: 'Lorem Ipsum Dolor',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      url: '/learning-domains/social-and-emotional-learning/self-regulation',
      background: 'linear-gradient(135deg, #D10A7D 0%, #930758 100%)',
      hoverBorderColor: '#A40862',
      imageAlt: 'Self-Regulation icon - child managing emotions',
      imageSrc: 'assets/img/domain/colour/domain-soc-emot-lrn-col.png',
    },
    {
      title: 'Sed Do Eiusmod Tempor',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.',
      url: '/learning-domains/social-and-emotional-learning/social-skills',
      background: 'linear-gradient(135deg, #D10A7D 0%, #930758 100%)',
      hoverBorderColor: '#A40862',
      imageAlt: 'Social Skills icon - children playing together',
      imageSrc: 'assets/img/domain/colour/domain-soc-emot-lrn-col.png',
    },
    {
      title: 'Ut Labore Et Dolore',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.',
      url: '/learning-domains/social-and-emotional-learning/emotional-awareness',
      background: 'linear-gradient(135deg, #D10A7D 0%, #930758 100%)',
      hoverBorderColor: '#A40862',
      imageAlt: 'Emotional Awareness icon - child expressing feelings',
      imageSrc: 'assets/img/domain/colour/domain-soc-emot-lrn-col.png',
    },
    {
      title: 'Consectetur Adipiscing',
      description:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum delenit atque corrupti.',
      url: '/learning-domains/social-and-emotional-learning/relationship-building',
      background: 'linear-gradient(135deg, #D10A7D 0%, #930758 100%)',
      hoverBorderColor: '#A40862',
      imageAlt: 'Relationship Building icon - child hugging peer',
      imageSrc: 'assets/img/domain/colour/domain-soc-emot-lrn-col.png',
    },
    {
      title: 'Duis aute Irure',
      description:
        'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere.',
      url: '/learning-domains/social-and-emotional-learning/social-understanding',
      background: 'linear-gradient(135deg, #D10A7D 0%, #930758 100%)',
      hoverBorderColor: '#A40862',
      imageAlt: 'Social Understanding icon - child in group setting',
      imageSrc: 'assets/img/domain/colour/domain-soc-emot-lrn-col.png',
    },
    {
      title: 'Voluptate Velit Esse',
      description:
        'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum.',
      url: '/learning-domains/social-and-emotional-learning/ut-labore-et-dolore',
      background: 'linear-gradient(135deg, #D10A7D 0%, #930758 100%)',
      hoverBorderColor: '#A40862',
      imageAlt: 'Confidence and Independence icon - child trying new activity',
      imageSrc: 'assets/img/domain/colour/domain-soc-emot-lrn-col.png',
    },
  ];
}
