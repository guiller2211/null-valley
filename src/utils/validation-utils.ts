const words = ["Manzana", "coliflor", "bombilla", "derecha", "izquierda", "rojo", "azul"];

export function ofuscarPalabrasProhibidas(texto: string): string {
    let textoOfuscado = texto;

    words.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, "gi"); 
        textoOfuscado = textoOfuscado.replace(regex, "*".repeat(word.length)); 
    });

    return textoOfuscado;
}
