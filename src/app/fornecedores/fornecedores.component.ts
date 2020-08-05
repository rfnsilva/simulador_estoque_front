import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.scss']
})

export class FornecedoresComponent implements OnInit {
  title = 'fornecedores';
  profileForm = new FormGroup({
    nome: new FormControl(''),
    categoriaId: new FormControl('')
  });
  readonly apiURL : string;
  public rota: Router;
  public modal_nome: string = '';
  public modal_id: string = '';
  public modal_categoria: string = '';

  @Input()
  public fornecedores: any;

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
    
    this.http.get(`${this.apiURL}/get_fornecedores`, { 'headers': headers })
     .subscribe(result => {
       this.fornecedores = result;
     });
  }

  Adicionar(id_button: number, id: string, nome: string, categoria: any, produtos: any) {
    //edit = 1 del = 2 detalhes = 3
    
    if (id_button === 2) {
      if(confirm("confirma delete da categoria: " + id)) {
        const headers= new HttpHeaders()
         .set('content-type', 'application/json')
         .set('Access-Control-Allow-Origin', '*');
        
        this.http.delete(`${this.apiURL}/del_fornecedor/${id}`, { 'headers': headers })
         .subscribe(result => {
           this.fornecedores = result;
         });
      }
    }

    if (id_button === 1) {
      this.modal_nome = nome;
      this.modal_id = id;
      this.modal_categoria = categoria;
    }

    if (id_button === 3) {
      this.modal_nome = nome;
      this.modal_id = id;
      this.modal_categoria = categoria;
    }
  }

  editar(fornecedor: any) {
    const cat_enviar = {
      nome: `${fornecedor.nome}`
    }
    
    const headers = new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');
   
    this.http.put(`${this.apiURL}/edit_fornecedor/${this.modal_id}`, cat_enviar, { 'headers': headers })
     .subscribe(result => {
       this.fornecedores = result;
     });
  }

  onSubmit() {
    this.editar(this.profileForm.value);
  }

  add(fornecedor: any) {
    const cat_enviar = {
      nome: `${fornecedor}`
    }
    
    const headers = new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');
   
    this.http.post(`${this.apiURL}/add_fornecedor`, fornecedor, { 'headers': headers })
     .subscribe(result => {
       this.fornecedores = result;
     });
  }

  onSubmit1() {
    this.add(this.profileForm.value);
  }
}
