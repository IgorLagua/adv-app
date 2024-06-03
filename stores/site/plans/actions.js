

const actions = {

    // Função para obter os planos
    async getPlansAction(apiPath) {
        // const { data, pending, error, refresh, status } = await useApi('/plans');

        if (this.data.length > 0) return;  // se já tem dados de planos, não busca novamente

        const { data, error, fetchApiData } = useApi();

        await fetchApiData(apiPath);

        this.data = data.value;

    },

    



    //     // Encontrar o índice do elemento com filtros correspondentes
    //     const foundIndex = this.mccbsSelected.findIndex(el => el.id === parseInt(mccbId));
    
    //     // Se o índice for encontrado, atualize o indexMccbSelected e indexAccessoriesByFrame e retorne
    //     if (foundIndex !== -1) {
    //         this.indexMccbSelected = foundIndex;
    //         return;
    //     }

    //     try {
    //         // Criar uma instância URL
    //         const apiPath = `mccb/${mccbId}`;
        
    //         // Realizar a chamada da API
    //         const response = await fetchDataFromAPI(apiPath);
        
    //         // Armazenar os dados no estado
    //         this.mccbsSelected.push(response.data);
        
    //         // Atualizar o indexMccbSelected
    //         this.indexMccbSelected = this.mccbsSelected.length - 1;
    
    //     } 
    //     catch (error) {
    //         console.error(error);
    //     }
   
    
    
    // // Função para obter os acessórios do MCCB
    // async getMccbAccessoriesByLineAndFrame(line, frame) {

    //     const filter = {
    //         line: line,
    //         frame: frame,
    //     }

    //     // Encontrar o índice do elemento com filtros correspondentes
    //     const foundIndex = this.mccbAccessories.findIndex(el => JSON.stringify(el.filter) === JSON.stringify(filter));

    //     // Se o índice for encontrado, atualize o indexMccbAccessories e retorne
    //     if (foundIndex !== -1) {
    //         this.indexMccbAccessories = foundIndex;
    //         return;
    //     }
    
    //     try {
    //         // Criar uma instância URL
    //         const apiPath = 'mccb/accessories';
        
    //         // Realizar a chamada da API
    //         const response = await fetchDataFromAPI(apiPath, filter);
        
    //         // Armazenar os dados no estado
    //         this.mccbAccessories.push({
    //             filter,
    //             data: response.data
    //         });
        
    //         // Atualizar o indexMccbAccessories
    //         this.indexMccbAccessories = this.mccbAccessories.length - 1;
        
    //     } catch (error) {
    //         console.error(error);
    //     }
    // },


    // // Função para obter os dados da API apartir de uma referência antiga ou similar
    // async searchMccbsForCrossAPI(crossFilter) {
    //     // Encontrar o índice do elemento com filtros correspondentes
    //     const foundIndex = this.crossReferenceMccbsFilters.findIndex(el => el.crossFilter === crossFilter);
    
    //     // Se o índice for encontrado, atualize o indexMccbsFilters e retorne
    //     if (foundIndex !== -1) {
    //         this.indexMccbsFilters = foundIndex;
    //         return;
    //     }
    
    //     try {
    //         // Criar uma instância URL
    //         const apiPath = `mccb/cross-filter/${crossFilter}`;
        
    //         // Realizar a chamada da API
    //         const response = await fetchDataFromAPI(apiPath);
        
    //         // Armazenar os dados no estado
    //         this.crossReferenceMccbsFilters.push({
    //             data: response.data,
    //             crossFilter: crossFilter
    //         });

    //         // Atualizar o indexMccbsFilters
    //         this.indexMccbsFilters = this.crossReferenceMccbsFilters.length - 1;
    
    //     } catch (error) {
    //         console.error(error);
    //     }
    // },

    // // Função para obter os dados da API apartir de uma referência antiga ou similar
    // async getMccbByCrossAPI(mccbId) {
    //     // Encontrar o índice do elemento com filtros correspondentes
    //     const foundIndex = this.MccbByCross.findIndex(el => el.mccbId === mccbId);

    //     // Se o índice for encontrado, atualize o indexMccbByCross e retorne
    //     if (foundIndex !== -1) {
    //         this.indexMccbByCross = foundIndex;
    //         return;
    //     }

    //     try {
    //         // Criar uma instância URL
    //         const apiPath = `mccb/cross/${mccbId}`;

    //         // Realizar a chamada da API
    //         const response = await fetchDataFromAPI(apiPath);

    //         if (response.data.length > 0 ) {
    //             // Armazenar os dados no estado
    //             this.MccbByCross.push({
    //                 data: response.data,
    //                 mccbId: mccbId
    //             });
    //         } 
    //         else {
    //             // Armazenar os dados no estado
    //             this.MccbByCross.push({
    //                 data: this.crossReferenceMccbsFilters[this.indexMccbsFilters].data.filter(el => el.id === mccbId),
    //                 mccbId: mccbId
    //             });
    //         }

    //         // Atualizar o indexMccbByCross
    //         this.indexMccbByCross = this.MccbByCross.length - 1;

    //     } catch (error) {
    //         console.error(error);
    //     }
    // },

    // async getDataFiltersSpecificationAPI() {
    
    //     if ( Object.keys(this.MccbFiltersSpecification).length > 0 ) return

    //     try {
    //         // Criar uma instância URL
    //         const apiPath = 'mccb/specification-filter';
        
    //         // Realizar a chamada da API
    //         const response = await fetchDataFromAPI(apiPath);
        
    //         // Armazenar os dados no estado
    //         this.MccbFiltersSpecification = response.data
    
    //     } catch (error) {
    //         console.error(error);
    //     }
    // },

   
};

export default { ...actions };