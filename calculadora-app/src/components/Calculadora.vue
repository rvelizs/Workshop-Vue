<template>
  <div class="calculadora">
    <div class="display">{{valorActual || '0'}}</div>
    <div v-on:click="limpiar" class="button">C</div>
    <div v-on:click="signo" class="button">+/-</div>
    <div v-on:click="porcentaje" class="button">%</div>
    <div v-on:click="dividir" class="button operator">÷</div>
    <div v-on:click="juntarNumeros('7')" class="button">7</div>
    <div v-on:click="juntarNumeros('8')" class="button">8</div>
    <div v-on:click="juntarNumeros('9')" class="button">9</div>
    <div v-on:click="multiplicar" class="button operator">x</div>
    <div v-on:click="juntarNumeros('4')" class="button">4</div>
    <div v-on:click="juntarNumeros('5')" class="button">5</div>
    <div v-on:click="juntarNumeros('6')" class="button">6</div>
    <div v-on:click="disminuir" class="button operator">-</div>
    <div v-on:click="juntarNumeros('1')" class="button">1</div>
    <div v-on:click="juntarNumeros('2')" class="button">2</div>
    <div v-on:click="juntarNumeros('3')" class="button">3</div>
    <div v-on:click="sumar" class="button operator">+</div>
    <div v-on:click="juntarNumeros('0')" class="button zero">0</div>
    <div v-on:click="punto" class="button">.</div>
    <div v-on:click="resultado" class="button operator"> = </div>
  </div>
</template>

<script>
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
</script>

<style scoped>
.calculadora {
  margin: 0 auto;
  width: 350px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(50px, auto);
  font-size: 40px;
}
.display {
  grid-column: 1 / 5;
  background-color: #333;
  color: #fff;
}
.zero {
  grid-column: 1 / 3;
}
.button {
  background-color: #f2f2f2;
  border: 1px solid #333;
}
.operator {
  background-color: #DF3C48;
  color: white;
}
</style>
