import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@NgModule({
  declarations: [NavbarComponent],
  imports: [RouterModule, NgClass],
  exports: [NavbarComponent],
})
export class NavbarModule {}
