class GameElement {
  constructor(id, row, col, symbol) {
    this.id = id;
    this.row = row;
    this.col = col;
    this.symbol = symbol;
  }
}

class GameBoard {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.board = this.generateBoard();
  }

  generateBoard() {
    const board = [];
    let id = 1;
    const symbols = ["♧", "♤", "♢", "♡"];

    for (let row = 0; row < this.rows; row++) {
      const currentRow = [];
      for (let col = 0; col < this.cols; col++) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const element = new GameElement(id++, row, col, symbol);
        currentRow.push(element);
      }
      board.push(currentRow);
    }

    return board;
  }

  removeGroup(row, col) {
    const targetElement = this.board[row][col];
    const targetSymbol = targetElement.symbol;

    const visited = new Set();

    const dfs = (r, c) => {
      if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) {
        return;
      }

      const currentElement = this.board[r][c];
      if (!currentElement || visited.has(currentElement.id)) {
        return;
      }

      visited.add(currentElement.id);

      if (currentElement.symbol === targetSymbol) {
        this.board[r][c] = null; // видаляємо елемент
        dfs(r - 1, c); // верх
        dfs(r + 1, c); // низ
        dfs(r, c - 1); // ліво
        dfs(r, c + 1); // право
      }
    };

    dfs(row, col);
  }
}

// Створення екземпляра ігрового поля та вивід його на сторінку
const game = new GameBoard(4, 4);
const table = document.getElementById("game-board");

function handleClick(row, col) {
  game.removeGroup(row, col);
  updateBoard();
}

function updateBoard() {
  // Очистимо ігрове поле та виведемо новий стан
  table.innerHTML = "";
  for (let row = 0; row < game.rows; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < game.cols; col++) {
      const td = document.createElement("td");
      const element = game.board[row][col];

      if (element) {
        td.textContent = element.symbol;
        td.addEventListener("click", () => handleClick(row, col));
      } else {
        td.className = "empty";
      }

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

// Викликаємо функцію для початкового відображення ігрового поля
updateBoard();
