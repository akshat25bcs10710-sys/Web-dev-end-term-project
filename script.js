 const descriptionInput = document.getElementById("descriptionInput");
    const amountInput = document.getElementById("amountInput");
    const categoryInput = document.getElementById("categoryInput");
    const addButton = document.getElementById("addButton");
    const clearAllButton = document.getElementById("clearAllButton");
    const ledgerRows = document.getElementById("ledgerRows");
    const totalSpent = document.getElementById("totalSpent");
    const entryCount = document.getElementById("entryCount");

    let expenses = [];

    addButton.addEventListener("click", function () {
      const description = descriptionInput.value.trim();
      const amount = Number(amountInput.value);

      if (description === "" || amount <= 0) return;

      expenses.push({
        id: Date.now(),
        description,
        amount,
        category: categoryInput.value
      });

      descriptionInput.value = "";
      amountInput.value = "";

      renderLedger();
    });

    clearAllButton.addEventListener("click", function () {
      if (expenses.length === 0) return;

      const confirmClear = confirm("Clear all expenses?");
      if (!confirmClear) return;

      expenses = [];
      renderLedger();
    });

    ledgerRows.addEventListener("click", function (event) {
      const id = event.target.dataset.id;
      if (!id) return;

      expenses = expenses.filter(expense => expense.id != id);
      renderLedger();
    });

    function renderLedger() {
      ledgerRows.innerHTML = "";
      let total = 0;

      expenses.forEach(expense => {
        total += expense.amount;

        const row = document.createElement("div");
        row.className = "row";

        row.innerHTML = `
          <div>
            <strong>${expense.description}</strong><br>
            <small>${expense.category}</small>
          </div>
          <div>₹${expense.amount}</div>
          <div><button data-id="${expense.id}">DELETE</button></div>
        `;

        ledgerRows.appendChild(row);
      });

      totalSpent.textContent = "₹" + total;
      entryCount.textContent = expenses.length;
    }