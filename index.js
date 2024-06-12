const juegoAdivinaNumero = {
  targetNumber: Math.floor(Math.random() * 100) + 1,
  attempts: 0,
  maxAttempts: 10,
  historial: [],

  iniciar: function() {
      this.attempts = 0;
      this.historial = [];
      this.targetNumber = Math.floor(Math.random() * 100) + 1;
      console.log("¡Bienvenido al juego de adivina el número! Tienes " + this.maxAttempts + " intentos para adivinar un número entre 1 y 100.");
      setTimeout(() => this.jugar(), 100); // Asegura que los mensajes iniciales se muestren antes del prompt
  },

  jugar: function() {
      while (this.attempts < this.maxAttempts) {
          const guess = parseInt(prompt("Adivina el número (entre 1 y 100):"), 10);
          if (isNaN(guess)) {
              console.log("Por favor, introduce un número válido.");
              continue;
          }

          if (this.historial.includes(guess)) {
              console.log("Ya has intentado ese número. Intenta con otro.");
              continue;
          }

          this.attempts++;
          this.historial.push(guess);

          if (guess === this.targetNumber) {
              console.log("¡Felicidades! Adivinaste el número en " + this.attempts + " intentos.");
              this.mostrarHistorial();
              this.mostrarEstadisticas();
              return;
          } else if (guess < this.targetNumber) {
              console.log("El número es mayor. Intentos restantes: " + (this.maxAttempts - this.attempts));
          } else {
              console.log("El número es menor. Intentos restantes: " + (this.maxAttempts - this.attempts));
          }
      }
      console.log("Lo siento, se te han acabado los intentos. El número era: " + this.targetNumber);
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
      juegoAdivinaNumero.iniciar();
  });
});