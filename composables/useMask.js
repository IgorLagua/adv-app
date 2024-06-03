
export default () => {
    
    const cpfMask = reactive({
        mask: "###.###.###-##",
    })

    const cnpjMask = reactive({
        mask: "##.###.###/####-##",
    })

    const cpfCnpjMask = reactive({
        mask: [
            '###.###.###-##',
            '##.###.###/####-##'
        ],
    })

    const phoneMask = reactive({
        mask: [
            "(##) ####-####",
            "(##) #####-####",
        ],
    })

    // const cellPhoneMask = reactive({
    //     mask: "(##) #####-####",
    // })

    let zipCodeButtonValidation = ref(true)
    
    const zipCodeMask = reactive({
        mask: "#####-###",
        onMaska: (detail) => {
            if ( detail.completed ) {
                zipCodeButtonValidation.value = false
            } else {
                zipCodeButtonValidation.value = true
            }
        }
    })

    return {
        cpfMask,
        cnpjMask,
        // cpfCnpjMask,
        phoneMask,
        // cellPhoneMask,
        zipCodeMask,
        zipCodeButtonValidation
    }
}
