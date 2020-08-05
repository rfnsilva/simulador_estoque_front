import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})

export class CategoriasComponent implements OnInit {
  title = 'categorias';
  profileForm = new FormGroup({
    nome: new FormControl('')
  });
  readonly apiURL : string;
  public rota: Router;
  public modal_nome: string = '';
  public modal_id: string = '';
  public modal_fornecedor: any;

  @Input()
  public categorias: any;

  constructor(private http : HttpClient, private r: Router){
    this.apiURL = 'https://simulador-estoque.herokuapp.com/';
    this.rota = r;
  }

  ngOnInit(): void {
    //Toggle Click Function
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    $(document).ready(function() {

      function toggleSidebar() {
        $(".button").toggleClass("active");
        $("main").toggleClass("move-to-left");
        $(".sidebar-item").toggleClass("active");
      }
    
      $(".button").on("click tap", function() {
        toggleSidebar();
      });
    
      $(document).keyup(function(e) {
        if (e.keyCode === 27) {
          toggleSidebar();
        }
      });
    
    });

    const headers= new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');
    
    this.http.get(`${this.apiURL}/get_categorias`, { 'headers': headers })
     .subscribe(result => {
       this.categorias = result;
     });
  }

  Adicionar(id_button: number, id: string, nome: string, fornecedor: any, produtos: any) {
    //edit = 1 del = 2 detalhes = 3
    
    if (id_button === 2) {
      if(confirm("confirma delete da categoria: " + id)) {
        const headers= new HttpHeaders()
         .set('content-type', 'application/json')
         .set('Access-Control-Allow-Origin', '*');
        
        this.http.delete(`${this.apiURL}/del_categoria/${id}`, { 'headers': headers })
         .subscribe(result => {
           this.categorias = result;
         });
      }
    }

    if (id_button === 1) {
      this.modal_nome = nome;
      this.modal_id = id;
    }

    if (id_button === 3) {
      this.modal_nome = nome;
      this.modal_id = id;
      this.modal_fornecedor = fornecedor;
    }
  }

  editar(categoria: any) {
    const cat_enviar = {
      nome: `${categoria.nome}`
    }
    
    const headers = new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');
   
    this.http.put(`${this.apiURL}/edit_categoria/${this.modal_id}`, cat_enviar, { 'headers': headers })
     .subscribe(result => {
       this.categorias = result;
     });
  }

  onSubmit() {
    this.editar(this.profileForm.value);
  }

  add(nome: string) {
    const cat_enviar = {
      nome: `${nome}`
    }
    
    const headers = new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');
   
    this.http.post(`${this.apiURL}/add_categoria`, nome, { 'headers': headers })
     .subscribe(result => {
       this.categorias = result;
       console.log(this.categorias)
     });
  }

  onSubmit1() {
    this.add(this.profileForm.value);
  }
}
