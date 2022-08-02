import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JogoDaVelhaService {
  
  /*Constantes*/
  private readonly TAM_TAB: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly VOID: number = 0;

  /*Atributos de Controle*/
  private tabuleiro: any;
  private numMovimentos: number;
  private win: any;

  /*Atributos de Tela*/
  private _player: number;
  private _showInicio: boolean;
  private _showTabuleiro: boolean;
  private _showFinal: boolean;

  constructor() { }

  /**
   * Inicializa o jogo. Define a exibição da tela inicial
   * 
   * @returns void
   */
  inicializarTela(): void {
    this._showInicio = true;
    this._showTabuleiro = false;
    this._showFinal = false;
    this.numMovimentos = 0;
    this._player = this.X;
    this.win = false;
    this.inicializarTabuleiro();
  }

  /**
   * Inicializa o tabuleiro do jogo, com vazio para todas
   * as posições.
   * 
   * @returns void
   */
  inicializarTabuleiro(): void {
    this.tabuleiro = [this.TAM_TAB];
    for (let i = 0; i < this.TAM_TAB; i++) {
      this.tabuleiro[i] = [this.VOID, this.VOID, this.VOID];
    }
  }

  /**
   * Retorna se a tela de início deve ser exibida.
   * 
   * @returns boolean
   */
  get showInicio(): boolean {
    return this._showInicio;
  }

  /**
   * Retorna se o tabuleiro deve ser exibido.
   * 
   * @returns boolean
   */
  get showTabuleiro(): boolean {
    return this._showTabuleiro;
  }

  /**
   * Retorna se a tela de GAMEOVER deve ser exibida.
   * 
   * @returns boolean
   */
  get showFinal(): boolean {
    return this._showFinal;
  }

  /**
   * Retorna o número do player a realizar a jogada.
   * 
   * @returns number
   */
  get player(): number {
    return this._player;
  }

  /**
   * Exibe o tabuleiro do jogo.
   * 
   * @returns void
   */
  iniciarJogo(): void {
    this._showInicio = false;
    this._showTabuleiro = true;
  }

  /**
   * Realiza uma jogada dado as coordenadas do tabuleiro.
   * 
   * @param posicaoX number
   * @param posicaoY number
   * @returns void
   */
  jogar(posicaoX: number, posicaoY: number): void {
    
    /*Verificação de jogada inválida*/
    if (this.tabuleiro[posicaoX][posicaoY] !== this.VOID || this.win) {
      return;
    }

    /*Jogada do Player*/
    this.tabuleiro[posicaoX][posicaoY] = this._player;
    this.numMovimentos++;

    /*Verificando se o jogo terminou*/
    this.win = this.fimJogo(posicaoX, posicaoY,
       this.tabuleiro, this._player);

    /*Verifica qual player vai jogar e faz a inversão*/
    this._player = (this._player === this.X) ? this.O : this.X;

    /*Verifica se o Bot deve jogar*/
    if (!this.win && this.numMovimentos < 9) {
      this.cpuJogar();
    }

    /*Verifica se houve vitória*/
    if (this.win !== false) {
      this._showFinal = true;
    }

    /*Verifica se houve empate*/
    if (!this.win && this.numMovimentos === 9) {
      this._player = 0;
      this._showFinal = true;
    }
  }

  /**
   * Verifica e retorna se o jogo terminou.
   * 
   * @param linha number
   * @param coluna number
   * @param tabuleiro any
   * @param player number
   * @returns []
   */
  fimJogo(linha: number, coluna: number,
    tabuleiro: any, player: number) {
      let fim: any = false;

      /*Valida as diagonais*/
      if (tabuleiro[0][0] === player &&
        tabuleiro[1][1] === player &&
        tabuleiro[2][2] === player) {
          fim = [[0, 0], [1, 1], [2, 2]];
        }

      if (tabuleiro[0][2] === player &&
        tabuleiro[1][1] === player &&
        tabuleiro[2][0] === player) {
          fim = [[0, 2], [1, 1], [2, 0]];
      }

      /*Valida Colunas*/
      if (tabuleiro[0][0] === player &&
        tabuleiro[1][0] === player &&
        tabuleiro[2][0] === player) {
          fim = [[0, 0], [1, 0], [2,0]];
      }

      if (tabuleiro[0][1] === player &&
        tabuleiro[1][1] === player &&
        tabuleiro[2][1] === player) {
          fim = [[0, 1], [1, 1], [2, 1]];
      }

      if (tabuleiro[0][2] === player &&
        tabuleiro[1][2] === player &&
        tabuleiro[2][2] === player) {
          fim = [[0, 2], [1, 2], [2, 2]];
      }

      /*Valida Linhas*/
      if (tabuleiro[0][0] === player &&
        tabuleiro[0][1] === player &&
        tabuleiro[0][2] === player) {
          fim = [[0, 0], [0, 1], [0, 2]];
      }

      if (tabuleiro[1][0] === player &&
        tabuleiro[1][1] === player &&
        tabuleiro[1][2] === player) {
          fim = [[1, 0], [1, 1], [1, 2]];
      }

      if (tabuleiro[2][0] === player &&
        tabuleiro[2][1] === player &&
        tabuleiro[2][2] === player) {
          fim = [[2, 0], [2, 1], [2, 2]];
      }
      return fim;
  }

  /**
   * Lógica que simula jogada do computador em modo aleatório.
   * 
   * @returns void
   */
  cpuJogar(): void {

    /*Verifica jogada de vitória*/
    let jogada: number[] = this.obterJogada(this.O);

    if (jogada.length <= 0) {
      /*Jogada para evitar derrota*/
      jogada = this.obterJogada(this.X);
    }

    if (jogada.length <= 0) {
      /*Jogando aleatóriamente*/
      let jogadas: any = [];
      
      for (let i=0; i<this.TAM_TAB; i++) {
        for (let j=0; j<this.TAM_TAB; j++) {
          if (this.tabuleiro[i][j] === this.VOID) {
            jogadas.push([i, j]);
          }
        }
      }
      let k = Math.floor((Math.random() * (jogadas.length - 1)));
      jogada = [jogadas[k][0], jogadas[k][1]];
    }


    this.tabuleiro[jogada[0]][jogada[1]] = this._player;
    this.numMovimentos++;
    this.win = this.fimJogo(jogada[0], jogada[1],
      this.tabuleiro, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;
  }

  /**
   * 
   * @param jogador number
   * @returns number[]
   */
  obterJogada(player: number): number[] {

    let tab = this.tabuleiro;
    for (let lin = 0; lin<this.TAM_TAB; lin++) {
      for (let col = 0; col<this.TAM_TAB; col++) {
        if (tab[lin][col] !== this.VOID) {
          continue;
        }
        tab[lin][col] = player;
        if (this.fimJogo(lin, col, tab, player)) {
          return [lin, col];
        }
        tab[lin][col] = this.VOID;
      }
    }
    return [];
  }

  /**
   * Retorna se a peça X deve ser exibida para a coordenada
   * informada.
   * 
   * @param posicaoX number
   * @param posicaoY number
   * @returns boolean
   */
  exibirX(posicaoX: number, posicaoY: number): boolean {
    return this.tabuleiro[posicaoX][posicaoY] === this.X;
  }

  /**
   * Retorna se a peça O deve ser exibida para a coordenada
   * informada.
   * 
   * @param posicaoX number
   * @param posicaoY number
   * @returns boolean
   */
  exibirO(posicaoX: number, posicaoY: number): boolean {
    return this.tabuleiro[posicaoX][posicaoY] === this.O;
  }

  /**
   * Retorna se a marcação de vitória deve ser exibida para a
   * coordenada informada.
   * 
   * @param posicaoX number
   * @param posicaoY number
   * @returns boolean
   */
  exibirVitoria(posicaoX: number, posicaoY: number): boolean {
    let exibirVitoria: boolean = false;

    if (!this.win) {
      return exibirVitoria;
    }

    for (let posicao of this.win) {
      if (posicao[0] === posicaoX && posicao[1] === posicaoY) {
        exibirVitoria = true;
        break;
      }
    }

    return exibirVitoria;
  }

  /**
   * Inicia um novo jogo, assim como exibe o tabuleiro.
   * 
   * @returns void
   */
  newGame(): void {
    this.inicializarTela();
    this._showFinal = false;
    this._showInicio = false;
    this._showTabuleiro = true;
  }
}
