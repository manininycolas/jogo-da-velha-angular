import { Component, OnInit } from '@angular/core';

import { JogoDaVelhaService } from './shared';

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.css']
})
export class JogoDaVelhaComponent implements OnInit {

  constructor(private jogoDaVelhaService: JogoDaVelhaService) { }

  ngOnInit(): void {
    this.jogoDaVelhaService.inicializarTela();
  }

  /**
   * Retorna se a tela de início deve ser exibida.
   * 
   * @returns boolean
   */
  get showInicio(): boolean {
    return this.jogoDaVelhaService.showInicio;
  }

  /**
   * Retorna se o tabuleiro deve ser exibido.
   * 
   * @returns boolean
   */
  get showTabuleiro(): boolean {
    return this.jogoDaVelhaService.showTabuleiro;
  }

  /**
   * Retorna se a tela de fim de jogo deve ser exibida.
   * 
   * @returns boolean
   */
  get showFinal(): boolean {
    return this.jogoDaVelhaService.showFinal;
  }

  /**
   * Inicializa os dados de um novo jogo.
   * 
   * @returns void
   */
  iniciarJogo(): void {
    this.jogoDaVelhaService.iniciarJogo();
  }

  /**
   * Realiza uma jogada ao clicar um local no tabuleiro.
   * 
   * @param posicaoX number
   * @param posicaoY number
   * @returns void
   */
  jogar(posicaoX: number, posicaoY: number): void {
    this.jogoDaVelhaService.jogar(posicaoX, posicaoY);
  }

  /**
   * Retorna se a peça X deve ser exibida para a
   * coordenada informada.
   * 
   * @param posicaoX number
   * @param posicaoY number
   * @returns boolean
   */
  exibirX(posicaoX: number, posicaoY: number): boolean {
    return this.jogoDaVelhaService.exibirX(posicaoX, posicaoY);
  }

  /**
   * Retorna se a peça O deve ser exibida para a
   * coordenada informada.
   * 
   * @param posicaoX number
   * @param posicaoY number
   * @returns boolean
   */
  exibirO(posicaoX: number, posicaoY: number): boolean {
    return this.jogoDaVelhaService.exibirO(posicaoX, posicaoY);
  }

  /**
   * Retorna se a marcação de vitória deve ser exibida
   * para a coordenada informada.
   * 
   * @param posicaoX number
   * @param posicaoY number
   * @returns boolean
   */
  exibirVitoria(posicaoX: number, posicaoY: number): boolean {
    return this.jogoDaVelhaService.exibirVitoria(posicaoX, posicaoY);
  }

  /**
   * Retorna o número do player a jogar.
   * 
   * @returns number
   */
  get player(): number {
    return this.jogoDaVelhaService.player;
  }

  /**
   * Inicia um novo jogo.
   * 
   * @returns
   */
  newGame(): void {
    this.jogoDaVelhaService.newGame();
  }
}
