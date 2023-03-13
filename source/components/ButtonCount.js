class ButtonCount extends HTMLElement {
    constructor() {
      super();
  
      const shadow = this.attachShadow({ mode: 'open' });
  
      const button = document.createElement('button');

      button.addEventListener('click', () => {
        this.count = this.count + 1;
        this.render();
      });
  
      this.count = 0;
  
      shadow.appendChild(button);
  
      this.render();
    }
  
    render() {
      this.shadowRoot.querySelector('button').textContent = `Times Clicked: ${this.count}`;
    }
  }
  
  customElements.define('button-count', ButtonCount);
  