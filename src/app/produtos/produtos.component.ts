import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {
  title = 'produtos';
  profileForm = new FormGroup({
    nome: new FormControl(''),
    preco: new FormControl(''),
    categoriaId: new FormControl(''),
    fornecedorId: new FormControl('')
  });
  readonly apiURL : string;
  public rota: Router;
  public modal_nome: string = '';
  public modal_id: string = '';
  public modal_preco: number;
  public modal_categoria: any;
  public modal_fornecedor: any;

  @Input()
  public produtos: any;

  constructor(private http : HttpClient, private r: Router){
    this.apiURL = 'https://simulador-estoque.herokuapp.com';
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
    
    this.http.get(`${this.apiURL}/get_produtos`, { 'headers': headers })
     .subscribe(result => {
       this.produtos = result;
     });
  }

  Adicionar(id_button: number, id: string, nome: string, preco: number, categoria: any, fornecedor: any) {
    //edit = 1 del = 2 detalhes = 3
    
    if (id_button === 2) {
      if(confirm("confirma delete do produto: " + id)) {
        const headers= new HttpHeaders()
         .set('content-type', 'application/json')
         .set('Access-Control-Allow-Origin', '*');
        
        this.http.delete(`${this.apiURL}/del_produto/${id}`, { 'headers': headers })
         .subscribe(result => {
           this.produtos = result;
         });
      }
    }

    if (id_button === 1) {
      this.modal_nome = nome;
      this.modal_id = id;
      this.modal_preco = preco;
      this.modal_categoria = categoria;
      this.modal_fornecedor = fornecedor;
    }

    if (id_button === 3) {
      this.modal_nome = nome;
      this.modal_id = id;
      this.modal_preco = preco;
      this.modal_categoria = categoria;
      this.modal_fornecedor = fornecedor;
    }
  }

  editar(produto: any) {
    const cat_enviar = {
      nome: `${produto.nome}`,
      preco: `${produto.preco}`
    }
    
    const headers = new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');
   
    this.http.put(`${this.apiURL}/edit_produto/${this.modal_id}`, cat_enviar, { 'headers': headers })
     .subscribe(result => {
       this.produtos = result;
     });
  }

  onSubmit() {
    this.editar(this.profileForm.value);
  }

  add(produto: any) {
    const headers = new HttpHeaders()
     .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    
    console.log(produto)
   
    this.http.post(`${this.apiURL}/add_produto`, produto, { 'headers': headers })
     .subscribe(result => {
       this.produtos = result;
       console.log(this.produtos)
     });
  }

  onSubmit1() {
    this.add(this.profileForm.value);
  }
}
