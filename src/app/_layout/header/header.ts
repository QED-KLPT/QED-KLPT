import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GlobalAlertComponent } from '../../components/shared/global-alert';
import { Nav } from '../nav/nav';

@Component({
  selector: 'app-header',
  imports: [GlobalAlertComponent, Nav],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly showDraftContentDisclaimer = environment.showDraftContentDisclaimer;
}
