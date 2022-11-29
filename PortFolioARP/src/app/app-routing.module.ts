import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarEducacionComponent } from './componentes/editar-educacion/editar-educacion.component';
import { EditarExpereincialaboralComponent } from './componentes/editar-expereincialaboral/editar-expereincialaboral.component';
import { EditarHabilidadComponent } from './componentes/editar-habilidad/editar-habilidad.component';
import { EditarPersonaComponent } from './componentes/editar-persona/editar-persona.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { NuevaEducacionComponent } from './componentes/nueva-educacion/nueva-educacion.component';
import { NuevaExperienciaComponent } from './componentes/nueva-experiencia/nueva-experiencia.component';
import { NuevaHabilidadComponent } from './componentes/nueva-habilidad/nueva-habilidad.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';

import { GuardGuard } from './servicio/guard.guard';


const routes: Routes = [
  //{path:'portfolio/:user',component:PortfolioComponent},
  {path:'portfolio',component:PortfolioComponent},
  {path:'iniciar-sesion',component:IniciarSesionComponent},  
  {path:'',redirectTo:'portfolio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
