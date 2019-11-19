import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslatePipe } from 'src/app/pipes/translate.pipe';



@NgModule({
  declarations: [TranslatePipe],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [TranslatePipe, CommonModule, ReactiveFormsModule, FormsModule]
})
export class ShareModule {}
