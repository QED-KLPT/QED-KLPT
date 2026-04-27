import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PromotionalPanelComponent } from '../../shared/promotional-panel/promotional-panel.component';

@Component({
  selector: 'app-testing-promotional-panel',
  imports: [PromotionalPanelComponent],
  templateUrl: './testing-promotional-panel.html',
  styleUrl: './testing-promotional-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestingPromotionalPanel {
  title1 = 'Discover Our New Learning Resources';
  description1 = 'Explore our comprehensive collection of teaching materials designed to support kindergarten educators in tracking and nurturing each child\'s developmental progress.';
  ctaLabel1 = 'Explore resources';

  title2 = 'Supporting Children\'s Numeracy Skills';
  description2 = 'Our numeracy progression framework helps educators identify where each child is in their mathematical journey and plan targeted learning experiences that build confidence and competence. From counting and pattern recognition to early problem-solving, every step matters in developing strong numeracy foundations.';
  ctaLabel2 = 'View framework';

  title3 = 'Upcoming Professional Development Workshop';
  description3 = 'Join us for a hands-on workshop focused on formative assessment strategies. Learn practical techniques for observing, documenting, and using evidence to inform your teaching practice.';
  ctaLabel3 = 'Register now';

  title4 = 'Family Engagement Resources';
  description4 = 'Strengthen the partnership between home and early learning settings with our family engagement toolkit. Includes conversation guides, activity suggestions, and multilingual resources.';
  ctaLabel4 = 'Download toolkit';

  title5 = 'Executive Function in Early Learning';
  description5 = 'Understanding how children develop working memory, cognitive flexibility, and self-regulation is key to creating supportive learning environments. Explore our evidence-based approaches.';
  ctaLabel5 = 'Learn more';

  title6 = 'Language and Literacy Development';
  description6 = 'From first words to early reading, language development is a complex and beautiful process. Discover strategies to support emergent literacy in your classroom.';
  ctaLabel6 = 'Explore strategies';

  title7 = 'Physical Activity and Movement';
  description7 = 'Movement is essential for healthy development. Our physicality progression outlines key milestones and provides activity ideas that promote gross motor, fine motor, and sensory integration skills.';
  ctaLabel7 = 'View progressions';

  title8 = 'Social and Emotional Learning';
  description8 = 'Helping children develop emotional awareness, empathy, and positive relationships lays the foundation for lifelong wellbeing. Access our social-emotional learning resources and guidance.';
  ctaLabel8 = 'Get started';

  title9 = 'Quality Observation Practices';
  description9 = 'Effective observation is at the heart of formative assessment. Learn how to capture meaningful evidence that informs planning and demonstrates each child\'s unique learning journey.';
  ctaLabel9 = 'Read the guide';

  title10 = 'Inclusive Teaching Practices';
  description10 = 'Every child learns differently. Our inclusive teaching resources provide strategies for adapting learning experiences to meet diverse needs and ensure all children can participate fully.';
  ctaLabel10 = 'View resources';

  imageUrl1 = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop';
  imageAlt1 = 'Children learning in a classroom';

  imageUrl2 = 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=500&fit=crop';
  imageAlt2 = 'Educational materials on a desk';

  imageUrl3 = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop';
  imageAlt3 = 'Professional development workshop';

  imageUrl4 = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=500&fit=crop';
  imageAlt4 = 'Family engagement materials';

  imageUrl5 = 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=500&fit=crop';
  imageAlt5 = 'Child playing with blocks';

  imageUrl6 = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop';
  imageAlt6 = 'Books and literacy materials';

  imageUrl7 = 'https://images.unsplash.com/photo-1571210862729-78a52d3779a2?w=800&h=500&fit=crop';
  imageAlt7 = 'Children playing outdoors';

  imageUrl8 = 'https://images.unsplash.com/photo-1581078426770-6d331e5a997x?w=800&h=500&fit=crop';
  imageAlt8 = 'Social emotional learning illustration';

  imageUrl9 = 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=500&fit=crop';
  imageAlt9 = 'Observation and documentation tools';

  imageUrl10 = 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&h=500&fit=crop';
  imageAlt10 = 'Inclusive classroom setting';

  icon1 = 'fa-light fa-graduation-cap';
  icon2 = 'fa-light fa-calculator';
  icon3 = 'fa-light fa-chalkboard-user';
  icon4 = 'fa-light fa-users';
  icon5 = 'fa-light fa-brain';
  icon6 = 'fa-light fa-book-open-reader';
  icon7 = 'fa-light fa-person-running';
  icon8 = 'fa-light fa-heart';
  icon9 = 'fa-light fa-clipboard-check';
  icon10 = 'fa-light fa-hands-holding-child';

  socialImageUrl = 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&h=600&fit=crop';
  socialImageAlt = 'Children learning together outdoors';

  familyImageUrl = 'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=1200&h=600&fit=crop';
  familyImageAlt = 'Family reading together';

  playImageUrl = 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=1200&h=600&fit=crop';
  playImageAlt = 'Children playing and learning';

  natureImageUrl = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop';
  natureImageAlt = 'Nature scene with sunlight through trees';

  oceanImageUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop';
  oceanImageAlt = 'Ocean waves on a sunny day';

  mountainImageUrl = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=600&fit=crop';
  mountainImageAlt = 'Mountain landscape at sunrise';

  forestImageUrl = 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=600&fit=crop';
  forestImageAlt = 'Green forest path in autumn';

  sunsetImageUrl = 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1200&h=600&fit=crop';
  sunsetImageAlt = 'Sunset over a calm landscape';

  gardenImageUrl = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&h=600&fit=crop';
  gardenImageAlt = 'Beautiful flower garden in spring';

  libraryImageUrl = 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=600&fit=crop';
  libraryImageAlt = 'Library with bookshelves';
}
