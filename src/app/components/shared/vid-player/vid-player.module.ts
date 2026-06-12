import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { VidPlayerComponent } from './vid-player.component';

@NgModule({
  declarations: [VidPlayerComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoadingSpinnerComponent,
  ],
  exports: [VidPlayerComponent],
})
export class VidPlayerModule {}
