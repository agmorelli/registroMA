import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OkComponent } from './paginas/ok/ok.component';
import { PasoUnoComponent } from './paginas/paso-uno/paso-uno.component';


const routes: Routes = [
  {path:"", component: PasoUnoComponent},
 { path:"ok", component: OkComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
