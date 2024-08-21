const rutInput = document.getElementById("rut");
const form = document.getElementById("rut-form");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const rutValue = rutInput.value.trim();
  const isValid = validateRut(rutValue);
  if (isValid) {
    errorMessage.textContent = "";
    successMessage.textContent = "RUT válido";
  } else {
    errorMessage.textContent = "RUT inválido";
    successMessage.textContent = "";
  }
});

function validateRut(rut) {
  // Remove dots and hyphen
  const cleanRut = rut.replace(/\./g, "").replace("-", "");

  // Check if it has 8 or 9 digits
  if (cleanRut.length !== 8 && cleanRut.length !== 9) {
    return false;
  }

  // Calculate check digit
  const checkDigit = calculateCheckDigit(cleanRut);

  // Compare check digit with the last digit of the RUT
  return parseInt(checkDigit) === parseInt(cleanRut.slice(-1));
}

function calculateCheckDigit(rut) {
  const factors = [3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < rut.length - 1; i++) {
    sum += parseInt(rut[i]) * factors[i];
  }
  const remainder = sum % 11;
  console.log(remainder);

  // Determine the check digit
  if (remainder === 0) {
    return "0"; // Check digit is 0
  } else if (remainder === 1) {
    return "K"; // Check digit is K
  } else {
    console.log((11 - remainder).toString());

    return (11 - remainder).toString(); // Check digit is 11 - remainder
  }
}
