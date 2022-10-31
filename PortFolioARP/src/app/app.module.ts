import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraComponent } from './componentes/barra/barra.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { InterceptorService } from './servicio/interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PortfolioService } from './servicio/portfolio.service';
import { RegistroComponent } from './componentes/registro/registro.component';
import { EditarPersonaComponent } from './componentes/editar-persona/editar-persona.component';
import { ExperiencialaboralComponent } from './componentes/experiencialaboral/experiencialaboral.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { EditarExpereincialaboralComponent } from './componentes/editar-expereincialaboral/editar-expereincialaboral.component';
import { NuevaExperienciaComponent } from './componentes/nueva-experiencia/nueva-experiencia.component';
import { NuevaEducacionComponent } from './componentes/nueva-educacion/nueva-educacion.component';
import { EditarEducacionComponent } from './componentes/editar-educacion/editar-educacion.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    BarraComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    IniciarSesionComponent,
    PortfolioComponent,  
    RegistroComponent, EditarPersonaComponent, ExperiencialaboralComponent, EducacionComponent, EditarExpereincialaboralComponent, NuevaExperienciaComponent, NuevaEducacionComponent, EditarEducacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule
   // FormsModule
  ],
  providers: [PortfolioService, 
            {provide: HTTP_INTERCEPTORS,useClass:InterceptorService, multi:true },DatePipe ],
            
  bootstrap: [AppComponent]
})
export class AppModule { }
