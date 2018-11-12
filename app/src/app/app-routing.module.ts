import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'novo-professor',
    loadChildren: './pages/novo-professor/novo-professor.module#NovoProfessorPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'lista-professores',
    loadChildren: './pages/lista-professores/lista-professores.module#ListaProfessoresPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'detalhes-professor',
    loadChildren: './pages/detalhes-professor/detalhes-professor.module#DetalhesProfessorPageModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
