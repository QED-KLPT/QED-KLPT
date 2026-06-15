import { TitleStrategy, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class CustomTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);

  override updateTitle(routerState: RouterStateSnapshot): void {
    // Traverse to the deepest child route to get its title
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const title = (route as { title?: string })?.title;

    if (title !== undefined && title !== null) {
      document.title = title;
      this.title.setTitle(title);
    }
  }
}
