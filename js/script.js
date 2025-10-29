document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu-list");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
});

document.addEventListener("DOMContentLoaded", () => {

  // ----------------- SPA Simples -----------------
  // Evita reload de formulário e permite renderização via JS
  const form = document.getElementById("donation-form");
  const messageContainer = document.getElementById("form-message");

  // Template para mensagens
  const templates = {
    success: (name) => `
      <div class="form-success">
        <h3>Obrigado, ${name}!</h3>
        <p>Sua doação foi registrada com sucesso. Entraremos em contato!</p>
      </div>
    `,
    error: (errors) => `
      <div class="form-error">
        <h3>Ops! Alguns campos estão incorretos:</h3>
        <ul>
          ${errors.map(err => `<li>${err}</li>`).join("")}
        </ul>
      </div>
    `
  };

  // ----------------- Validação de Formulário -----------------
  function validateForm(data) {
    const errors = [];

    // Nome não pode estar vazio
    if (!data.fname || data.fname.trim().length < 2) {
      errors.push("O campo Nome é obrigatório e deve ter pelo menos 2 caracteres.");
    }

    // WhatsApp deve ter formato válido (ex.: +55 (DDD) 99999-9999)
    const phonePattern = /^\+?\d{2}\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (!phonePattern.test(data.phone)) {
      errors.push("O campo Whatsapp está em formato incorreto. Ex: +55 (11) 91234-5678");
    }

    // Email deve ter formato válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      errors.push("O campo Email está em formato incorreto.");
    }

    return errors;
  }

  // ----------------- Evento de envio -----------------
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // evita reload

    // Captura valores
    const formData = {
      fname: document.getElementById("fname").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("emails").value
    };

    const validationErrors = validateForm(formData);

    if (validationErrors.length > 0) {
      // Mostra erros via template
      messageContainer.innerHTML = templates.error(validationErrors);
    } else {
      // Mostra sucesso via template
      messageContainer.innerHTML = templates.success(formData.fname);

      // Limpa formulário
      form.reset();
    }
  });

});
