import { Component, Listen, State, h } from '@stencil/core';

@Component({
  tag: 'meu-componente',
  styleUrl: 'meu-componente.css',
  shadow: true,
})
export class MeuComponente {
  timer: number;
  @State() currentTime: number = Date.now();
  @State() contador = 0;

  @Listen('click')
  onClick() {
    this.contador++;
  }

  onClick2() {
    location.reload();
  }

  connectedCallback() {
    this.timer = window.setInterval(() => {
      this.currentTime = Date.now();
    }, 999);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  render() {
    const time = new Date(this.currentTime).toLocaleTimeString();

    return (
      <div>
        <p>
          Hora: <span>{time}</span>
        </p>

        <p>
          Contador: <span>{this.contador}</span>
        </p>

        <button onClick={this.onClick}>Incrementar</button>

        <div>
          <button onClick={this.onClick2}>Reiniciar</button>
        </div>
      </div>
    );
  }
}
