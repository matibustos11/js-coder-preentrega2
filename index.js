const adivinaNumero = {
  numeroObjetivo: Math.floor(Math.random() * 100) + 1,
  intentos: 0,
  intentosMaximos: 10,
  historial: [],

  iniciar: function() {
      this.intentos = 0;
      this.historial = [];
      this.numeroObjetivo = Math.floor(Math.random() * 100) + 1;
      console.log("¡Bienvenido al juego de adivina el número! Tienes " + this.intentosMaximos + " intentos para adivinar un número entre 1 y 100.");
      setTimeout(() => this.jugar(), 100); // Asegura que los mensajes iniciales se muestren antes del prompt
  },

  jugar: function() {
      while (this.intentos < this.intentosMaximos) {
          const adivinanza = parseInt(prompt("Adivina el número (entre 1 y 100):"), 10);
          if (isNaN(adivinanza)) {
              console.log("Por favor, introduce un número válido.");
              continue;
          }

          if (this.historial.includes(adivinanza)) {
              console.log("Ya has intentado ese número. Intenta con otro.");
              continue;
          }

          this.intentos++;
          this.historial.push(adivinanza);

          if (adivinanza === this.numeroObjetivo) {
              console.log("¡Felicidades! Adivinaste el número en " + this.intentos + " intentos.");
              this.mostrarHistorial();
              this.mostrarEstadisticas();
              return;
          } else if (adivinanza < this.numeroObjetivo) {
              console.log("El número es mayor. Intentos restantes: " + (this.intentosMaximos - this.intentos));
          } else {
              console.log("El número es menor. Intentos restantes: " + (this.intentosMaximos - this.intentos));
          }
      }
      console.log("Lo siento, se te han acabado los intentos. El número era: " + this.numeroObjetivo);
      this.mostrarHistorial();
      this.mostrarEstadisticas();
  },

  mostrarHistorial: function() {
      if (this.historial.length > 0) {
          const historialFormateado = this.historial.map((intento, index) => {
              return "Intento " + (index + 1) + ": " + intento;
          }).join("\n");
          console.log("Historial de intentos:\n" + historialFormateado);
      } else {
          console.log("No hay intentos en el historial.");
      }
  },

  mostrarEstadisticas: function() {
      if (this.historial.length > 0) {
          const sumaIntentos = this.historial.reduce((total, intento) => total + intento, 0);
          const promedioIntentos = sumaIntentos / this.historial.length;
          console.log("Estadísticas de intentos:");
          console.log("Suma total de intentos: " + sumaIntentos);
          console.log("Promedio de intentos: " + promedioIntentos.toFixed(2));
      }
  }
};

document.addEventListener("DOMContentLoaded", function() {
  const startButton = document.getElementById("startButton");
  startButton.addEventListener("click", function() {
      adivinaNumero.iniciar();
  });
});