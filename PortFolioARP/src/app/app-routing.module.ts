import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarEducacionComponent } from './componentes/editar-educacion/editar-educacion.component';
import { EditarExpereincialaboralComponent } from './componentes/editar-expereincialaboral/editar-expereincialaboral.component';
import { EditarPersonaComponent } from './componentes/editar-persona/editar-persona.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { NuevaEducacionComponent } from './componentes/nueva-educacion/nueva-educacion.component';
import { NuevaExperienciaComponent } from './componentes/nueva-experiencia/nueva-experiencia.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { GuardGuard } from './servicio/guard.guard';


const routes: Routes = [
  //{path:'portfolio/:user',component:PortfolioComponent},
  {path:'portfolio',component:PortfolioComponent},
  {path:'iniciar-sesion',component:IniciarSesionComponent},
  {path:'registro',component:RegistroComponent},
  {path:'editar-persona/:id',component:EditarPersonaComponent},
  {path:'editar-expereincialaboral/:id',component:EditarExpereincialaboralComponent},
  {path:'editar-educacion/:id',component:EditarEducacionComponent},
  {path:'nueva-educacion/:id',component:NuevaEducacionComponent},
  {path:'nueva-experiencia/:id',component:NuevaExperienciaComponent},
  //{path:'',redirectTo:'iniciar-sesion',pathMatch:'full'}
  {path:'',redirectTo:'portfolio',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
