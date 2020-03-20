import { validarInput } from "./validar";

window.onload = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validarInput(input);
        });
    });
};