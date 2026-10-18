import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LoadingComponent,
    ConfirmationDialogComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarComponent,
    SidebarComponent,
    LoadingComponent,
    ConfirmationDialogComponent
  ]
})
export class SharedModule {}