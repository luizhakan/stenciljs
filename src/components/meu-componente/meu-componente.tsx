import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'meu-componente',
  styleUrl: 'meu-componente.css',
  shadow: true
})
export class MeuComponente {
  @Prop() primeiro: string;
  @Prop() segundo: string;
  @Prop() terceiro: string;
  @Prop() color: string = 'blue';

  private getText(): string {
    return `${this.primeiro} ${this.segundo} ${this.terceiro}`;
  }

  render() {
    return <h1 style={{ color: this.color }}>{this.getText()}</h1>;
  }
}
