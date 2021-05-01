import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasoUnoComponent } from './paginas/paso-uno/paso-uno.component';
import { FormUsuarioComponent } from './componentes/form-usuario/form-usuario.component';
import { FormVehiculoComponent } from './componentes/form-vehiculo/form-vehiculo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormCoberturaComponent } from './componentes/form-cobertura/form-cobertura.component';
import { FormConfirmacionComponent } from './componentes/form-confirmacion/form-confirmacion.component';
import { OkComponent } from './paginas/ok/ok.component';



@NgModule({
  declarations: [
    AppComponent,
    PasoUnoComponent,
    FormUsuarioComponent,
    FormVehiculoComponent,
    FormCoberturaComponent,
    FormConfirmacionComponent,
    OkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatProgressSpinnerModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
