import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlyrPlayerComponent } from './plyr-player.component';

@NgModule({
  declarations: [PlyrPlayerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    PlyrPlayerComponent
  ]
})
export class PlyrPlayerModule { }
