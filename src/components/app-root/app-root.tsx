import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <slot>
            <meu-componente primeiro="Primeiro" segundo="Segundo" terceiro="Terceiro" color='red'></meu-componente>
          </slot>
        </main>
      </div>
    );
  }
}
