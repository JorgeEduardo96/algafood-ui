import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RestauranteService } from '../restaurante.service';
import { CozinhaService } from 'src/app/cozinha/cozinha.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { RestauranteForm } from './restaurante.form';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ViaCEPService } from 'src/app/core/viacep.service';
import { CidadeService } from 'src/app/cidade/cidade.service';

@Component({
  selector: 'app-restaurante-cadastro',
  templateUrl: './restaurante-cadastro.component.html',
  styleUrls: ['./restaurante-cadastro.component.css'],
  providers: [RestauranteForm]
})
export class RestauranteCadastroComponent {

  restauranteId: any;
  cozinhas: any[] = [];
  cidades: any[] = [];

  constructor(
    private messageService: MessageService,
    private restauranteService: RestauranteService,
    private cozinhaService: CozinhaService,
    private cidadeService: CidadeService,
    private errorHandler: ErrorHandlerService,
    private cepService: ViaCEPService,
    public restauranteForm: RestauranteForm,

    private route: ActivatedRoute,
    private title: Title,
    private router: Router
  ) {
    this.carregarCozinhas();
    this.carregarCidades();
    this.restauranteId = this.route.snapshot.paramMap.get('id');

    if (this.restauranteId) {
      this.restauranteService.buscar(Number(this.restauranteId)).subscribe({
        next: (response) => {
          this.restauranteForm.init(response);    
          this.atualizarTituloEdicao();
        }, error: (error) => this.errorHandler.handle(error)
      })
    } else {
      this.title.setTitle("Novo Restaurante");
    }
  }

  get editando(): Boolean {
    return Boolean(this.restauranteId);
  }

  carregarCozinhas() {
    this.cozinhaService.listar().subscribe({
      next: (response) => {
        this.cozinhas = response._embedded['cozinhas'];
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  carregarCidades() {
    this.cidadeService.listar().subscribe({
      next: (response) => {
        this.cidades = response._embedded['cidades'];
      }, error: (error) => this.errorHandler.handle(error)
    }) 
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição do restaurante: ${this.restauranteForm.nome}`);
  }
  
  onSubmit() {
    if (this.editando) {
      this.atualizarRestaurante();
    } else {
      this.adicionarRestaurante();
    }
  }

  atualizarRestaurante() {
    this.restauranteService.atualizar(this.restauranteForm.restauranteValue, this.restauranteId).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Restaurante atualizado com sucesso!' });
        this.router.navigate(['restaurantes']);
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  adicionarRestaurante() {
    this.restauranteService.adicionar(this.restauranteForm.restauranteValue).subscribe({
      complete: () => {
        this.messageService.add({ severity: 'success', detail: 'Restaurante adicionado com sucesso!' });
        this.router.navigate(['restaurantes']);
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/restaurantes']);
  }

  buscarCep(event: any) {
    this.cepService.cep(event.target.value).subscribe({
      next: (response) => {
        this.preencherCamposEndereco(response);
      }, error: (error) => this.errorHandler.handle(error)
    })
  }

  private preencherCamposEndereco(response: any) {
    this.restauranteForm.endereco.get('logradouro').setValue(response.logradouro);    
    this.restauranteForm.endereco.get('bairro').setValue(response.bairro);
    this.restauranteForm.endereco.get('complemento').setValue(response.complemento);
  }

}
