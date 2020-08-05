import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.scss']
})
export class ContasComponent implements OnInit {
  title: 'contas'
  readonly apiURL : string;
  public rota: Router;
  public modal_conta_id: string = '';
  public modal_conta_valor: number = 0;

  profileForm = new FormGroup({
    valor: new FormControl('')
  });

  constructor(private http : HttpClient, private r: Router){
    this.apiURL = 'https://simulador-estoque.herokuapp.com/';
    this.rota = r;
  }

  @Input()
  public contas: any;
  
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
    
    this.http.get(`${this.apiURL}/get_conta`, { 'headers': headers })
     .subscribe(result => {
       this.contas = result;
     });
  }

  Adicionar(id: string, valor: number) {
    this.modal_conta_id = id;
    this.modal_conta_valor = valor;
  }
  
  pagar(conta: any) {
    const cat_enviar = {
      valor: `${conta.valor}`
    }
    
    const headers = new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');
   
    this.http.put(`${this.apiURL}/pagar_conta/${this.modal_conta_id}`, cat_enviar, { 'headers': headers })
     .subscribe(result => {
       this.contas = result;
       console.log(this.contas)
     });
  }

  onSubmit() {
    this.pagar(this.profileForm.value);
  }

}
