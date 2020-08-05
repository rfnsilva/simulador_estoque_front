import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ContasComponent } from './contas/contas.component';

const routes: Routes = [
  { path: '',   redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'fornecedores', component: FornecedoresComponent },
  { path: 'contas', component: ContasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
