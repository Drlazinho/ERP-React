export const formatarImagem = (value) => {
    return `data:image/png;base64,${value}`
}

export const formatarLinkImagem = (value) => {
    // const novaJanela = window.open()
    novaJanela.document.write(`<img src="data:image/png;base64,${value}" alt="Imagem" />`)

}
