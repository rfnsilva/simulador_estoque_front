import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'home';
  profileForm = new FormGroup({
    valor: new FormControl('')
  });


  @Input()
  public receita: any;
  @Input()
  public soma: any;
  @Input()
  public qtd_soma_estoque: any;
  
  public produto_del: any;
  readonly apiURL : string;
  public rota: Router;

  @Input()
  public verify_receita: boolean = false;

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
  
    this.http.get(`${this.apiURL}/get_receita`, { 'headers': headers })
      .subscribe(result => {
        this.receita = result;
        if (this.receita.length) {
          this.verify_receita = true;
        } else {
          this.verify_receita = false;
        }
      });
    
    this.http.get(`${this.apiURL}/get_sum_contas`, { 'headers': headers })
    .subscribe(result => {
      this.soma = result[0].sum;
    });

    this.http.get(`${this.apiURL}/get_qtd_produtos`, { 'headers': headers })
    .subscribe(result => {
      this.qtd_soma_estoque = result;
    });
  }

  add(receita: number) {
    const headers = new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');
   
    this.http.post(`${this.apiURL}/add_receita`, receita, { 'headers': headers })
     .subscribe(result => {
       this.receita = result;
       this.verify_receita = true;
     });
  }

  delete() {
    const headers = new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');
    
    this.http.delete(`${this.apiURL}/del_receita`, { 'headers': headers })
      .subscribe(result => {
        this.receita = result;
        this.verify_receita = false;
      });
  }

  onSubmit() {
    this.add(this.profileForm.value);
  }

  comprar(id: string) {
    const headers = new HttpHeaders()
     .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    
    this.http.post(`${this.apiURL}/comprar_produto`, id, { 'headers': headers })
     .subscribe(result => {
       this.produto_del = result;
     });
  }

  onSubmit1() {
    this.comprar(this.profileForm.value);
  }

}
