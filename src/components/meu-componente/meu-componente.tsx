import { Component, Watch, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'meu-componente',
  styleUrl: 'meu-componente.css',
  shadow: true,
})
export class MeuComponente {
  timer: number;

  @Prop() activated: boolean;
  @State() busy: boolean;
  @State() currentTime: number = Date.now();
  @State() lista: string[] = JSON.parse(localStorage.getItem('lista') || '[]');
  @State() nome: string;

  connectedCallback() {
    console.log('Componente criado');
    this.timer = window.setInterval(() => {
      this.currentTime = Date.now();
    }, 999);
  }

  disconnectedCallback() {
    window.clearInterval(this.timer);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.lista.push(this.nome);
    localStorage.setItem('lista', JSON.stringify(this.lista));
    this.nome = '';
  }

  handleDelete(i) {
    this.lista.splice(i, 1);
    localStorage.setItem('lista', JSON.stringify(this.lista));
  }

  handleEdit(i) {
    this.nome = this.lista[i];
    this.handleDelete(i);

    localStorage.setItem('lista', JSON.stringify(this.lista));

    this.handleSubmit(i);
  }

  handleChange(e) {
    this.nome = e.target.value;
  }

  @Watch('activated')
  watchPropHandle(newValue: boolean, oldValue: boolean) {
    console.log('The old value of activated is : ', oldValue);
    console.log('The new value of activated is : ', newValue);
  }

  @Watch('busy')
  watchStateHandler(newValue: boolean, oldValue: boolean) {
    console.log('The old value of busy is:', oldValue);
    console.log('The new value of busy is:', newValue);
  }

  @Watch('activated')
  @Watch('busy')
  watchMultiple(newValue: boolean, oldValue: boolean, propName: string){
    console.log(`The old value of ${propName} is:`, oldValue);
  }

  render() {
    const time = new Date(this.currentTime).toLocaleTimeString();

    return (
      <div>
        <p>{time}</p>

        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="nome">
            Nome <br />
            <input autoFocus type="text" id="nome" name="nome" value={this.nome} onInput={e => this.handleChange(e)} />
          </label>

          <input type="submit" value="Adicionar" />
        </form>

        <ul>
          {this.lista.map(item => (
            <li>
              {item}{' '}
              <span style={{ cursor: 'pointer' }} onClick={() => this.handleDelete(this.lista.indexOf(item))}>
                [x]
              </span>{' '}

            </li>
          ))}
        </ul>

        <button onClick={() => this.busy = !this.busy}>Toggle busy</button>

      </div>
    );
  }
}
