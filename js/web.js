function generatePassword() {
  const length = document.getElementById('length').value;
  const includeUppercase = document.getElementById('uppercase').checked;
  const includeLowercase = document.getElementById('lowercase').checked;
  const includeNumbers = document.getElementById('numbers').checked;
  const includeSymbols = document.getElementById('symbols').checked;

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+{}[]|\\;:\'",.<>?';

  let chars = '';
  let password = '';

  if (includeUppercase) {
    chars += uppercaseChars;
  }
  if (includeLowercase) {
    chars += lowercaseChars;
  }
  if (includeNumbers) {
    chars += numberChars;
  }
  if (includeSymbols) {
    chars += symbolChars;
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }

  document.getElementById('result').value = password;
}

document.getElementById('generate').addEventListener('click', generatePassword);

// Actualizar el valor del rango cuando cambia
const rangeInput = document.getElementById('length');
const rangeValue = document.getElementById('lengthValue');

rangeInput.addEventListener('input', function() {
  rangeValue.textContent = this.value;
});

// INICIALIZACION DE CLIPBOARD
// =======================================================
(function () {
  window.addEventListener('load', () => {
    const $clipboards = document.querySelectorAll('.js-clipboard');
    $clipboards.forEach((el) => {
      const isToggleTooltip = HSStaticMethods.getClassProperty(el, '--is-toggle-tooltip') === 'false' ? false : true;
      const clipboard = new ClipboardJS(el, {
        text: (trigger) => {
          const clipboardText = trigger.dataset.clipboardText;
          if (clipboardText) return clipboardText;
          const clipboardTarget = trigger.dataset.clipboardTarget;
          const $element = document.querySelector(clipboardTarget);
          if (
            $element.tagName === 'SELECT'
            || $element.tagName === 'INPUT'
            || $element.tagName === 'TEXTAREA'
          ) return $element.value
          else return $element.textContent;
        }
      });
      clipboard.on('success', () => {
        const $default = el.querySelector('.js-clipboard-default');
        const $success = el.querySelector('.js-clipboard-success');
        const $successText = el.querySelector('.js-clipboard-success-text');
        const successText = el.dataset.clipboardSuccessText || '';
        const tooltip = el.closest('.hs-tooltip');
        const $tooltip = HSTooltip.getInstance(tooltip, true);
        let oldSuccessText;
        if ($successText) {
          oldSuccessText = $successText.textContent
          $successText.textContent = successText
        }
        if ($default && $success) {
          $default.style.display = 'none'
          $success.style.display = 'block'
        }
        if (tooltip && isToggleTooltip) HSTooltip.show(tooltip);
        if (tooltip && !isToggleTooltip) $tooltip.element.popperInstance.update();
        setTimeout(function () {
          if ($successText && oldSuccessText) $successText.textContent = oldSuccessText;
          if (tooltip && isToggleTooltip) HSTooltip.hide(tooltip);
          if (tooltip && !isToggleTooltip) $tooltip.element.popperInstance.update();
          if ($default && $success) {
            $success.style.display = '';
            $default.style.display = '';
          }
        }, 800);
      });
    });
  })
})()