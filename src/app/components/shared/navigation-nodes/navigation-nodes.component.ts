import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

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
export class NavigationNodesComponent {
  @Input({ required: true }) sessionId!: string;
  @Input({ required: true }) currentNode!: NavigationNodeId;

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

  protected stateFor(node: NavigationNode): 'complete' | 'current' | 'pending' {
    const currentIndex = this.nodes.findIndex((item) => item.id === this.currentNode);
    const nodeIndex = this.nodes.findIndex((item) => item.id === node.id);

    if (nodeIndex === currentIndex) {
      return 'current';
    }

    return nodeIndex < currentIndex ? 'complete' : 'pending';
  }
}
