const words = ["Manzana", "coliflor", "bombilla", "derecha", "izquierda", "rojo", "azul"];

export function ofuscarPalabrasProhibidas(texto: string): string {
    let textoOfuscado = texto;

    words.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        textoOfuscado = textoOfuscado.replace(regex, "*".repeat(word.length));
    });

    return textoOfuscado;
}

export function validateNickName(value: string) {
    const alphanumericRegex = /^[a-z0-9]+$/i;
    if (value.length >= 6 && value.length <= 8 && alphanumericRegex.test(value)) {
        return true;
    } else {
        return false;
    }
};
