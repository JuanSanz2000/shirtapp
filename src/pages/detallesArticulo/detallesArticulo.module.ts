import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallesArticuloPage } from './detallesArticulo';


@NgModule({
declarations: [
    DetallesArticuloPage,
],
imports: [
IonicPageModule.forChild(DetallesArticuloPage)
],
})

export class DetallesArticuloPageModule {}