

export const buscarImportAcompanharFiltro = async (filtro) => {
    try{
        const result = await apiFactory.get(`ImportAcompanha?NroPo=${filtro}`)
        return  Promise.resolve(result.data.value);
    }catch(error){
        return Promise.reject(error);
    }
}