import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPersonaComponent } from './componentes/editar-persona/editar-persona.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { GuardGuard } from './servicio/guard.guard';


const routes: Routes = [
  {path:'portfolio',component:PortfolioComponent },
  {path:'iniciar-sesion',component:IniciarSesionComponent},
  {path:'registro',component:RegistroComponent},
  {path:'editar-persona',component:EditarPersonaComponent},
  {path:'',redirectTo:'iniciar-sesion',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
