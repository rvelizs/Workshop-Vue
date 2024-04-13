export default {
    data () {
      return {
        valorActual: '',
        valorCorriente: '',
        operator: null,
        operatorPulsado: false
      }
    },
    methods: {
      limpiar () {
        this.valorActual = ''
        this.numeroAnterior = null
        this.operator = null
        this.operatorPulsado = false
      },
      signo () {
        this.valorActual = this.valorActual.charAt(0) === '-' ? this.valorActual.slice(1) : `-${this.valorActual}`
      },
      porcentaje () {
        this.valorActual = `${parseFloat(this.valorActual) / 100}`
      },
      juntarNumeros (numero) {
        if (this.operatorPulsado) {
          this.valorActual = '';
          this.operatorPulsado = false;
        }
  
        this.valorActual = `${this.valorActual}${numero}`;
      },
      punto () {
        if (this.valorActual.indexOf('.') === -1) {
          this.juntarNumeros('.')
        }
      },
      establecerValor () {
        this.numeroAnterior = this.valorActual;
        this.operatorPulsado = true;
      },
      resultado () {
        this.valorActual = `${this.operator(
          parseFloat(this.numeroAnterior),
          parseFloat(this.valorActual)
        )}`
        this.numeroAnterior = null
      },
      dividir () {
        this.establecerValor()
        this.operator = (a, b) => a / b
      },
      multiplicar () {
        this.establecerValor()
        this.operator = (a, b) => a * b
      },
      disminuir () {
        this.establecerValor()
        this.operator = (a, b) => a - b
      },
      sumar () {
        this.establecerValor()
        this.operator = (a, b) => a + b
      },
      n () {
        this.valorActual = ''
      }
    }
}