import { usePlansStore } from '@/stores/site/plans'

// Encontra um plano através do id que vem pelo 'value'
export function useFindPlan(value) {

    const plans = usePlansStore()
    const planFound = plans.data.find(el => el.id === value)

    return {
        planFound
    };
}


export default () => {

    const brazilianStates = [
        'AC',
        'AL',
        'AM',
        'AP',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MG',
        'MS',
        'MT',
        'PA',
        'PB',
        'PE',
        'PI',
        'PR',
        'RJ',
        'RN',
        'RO',
        'RR',
        'RS',
        'SC',
        'SE',
        'SP',
        'TO',
    ]

    const nationalities = [ 'Brasileiro', 'Brasileira', 'Afegão', 'Afegã', 'Albanês', 'Albanesa', 'Alemão', 'Alemã', 'Americano', 'Americana', 'Andorrano', 'Angolano', 'Angolana', 'Antiguano', 'Argentino', 'Argentina', 'Armênio', 'Armênia', 'Australiano', 'Australiana', 'Austríaco', 'Austríaca', 'Azerbaijano', 'Bahamense', 'Barenita', 'Bangladeshi', 'Barbadiano', 'Barbadiana', 'Belga', 'Belizense', 'Beninense', 'Bielorrusso', 'Bielorrussa', 'Boliviano', 'Boliviana', 'Bósnio', 'Bósnia', 'Botsuano', 'Bruneano', 'Búlgaro', 'Búlgara', 'Burquinense', 'Burundiano', 'Butanês', 'Camaronês', 'Camaronesa', 'Cambojano', 'Canadense', 'Cabo-verdiano', 'Catariano', 'Cazaque', 'Centro-africano', 'Chadiano', 'Chileno', 'Chilena', 'Chinês', 'Chinesa', 'Cipriota', 'Colombiano', 'Colombiana', 'Comorense', 'Congolês', 'Congolesa', 'Norte-coreano', 'Norte-coreana', 'Sul-coreano', 'Sul-coreana', 'Costarriquenho', 'Costarriquenha', 'Marfinense', 'Croata', 'Cubano', 'Cubana', 'Dinamarquês', 'Dinamarquesa', 'Djibutiano', 'Dominicano', 'Dominicana', 'Timorense', 'Equatoriano', 'Equatoriana', 'Egípcio', 'Egípcia', 'Salvadorenho', 'Salvadorenha', 'Emiradense', 'Eritreu', 'Eslovaco', 'Eslovaca', 'Esloveno', 'Eslovena', 'Espanhol', 'Espanhola', 'Estadunidense', 'Estônio', 'Eswatini', 'Etíope', 'Fijiano', 'Filipino', 'Filipina', 'Finlandês', 'Finlandesa', 'Francês', 'Francesa', 'Gabonês', 'Gambiano', 'Georgiano', 'Ganês', 'Gibraltariano', 'Grego', 'Grega', 'Grenadiano', 'Guatemalteco', 'Guatemalteca', 'Guineano', 'Guineense', 'Guyanese', 'Haitiano', 'Holandês', 'Holandesa', 'Hondurenho', 'Hondurenha', 'Húngaro', 'Húngara', 'Indiano', 'Indiana', 'Indonésio', 'Indonésia', 'Iraniano', 'Iraniana', 'Iraquiano', 'Iraquiana', 'Irlandês', 'Irlandesa', 'Islandês', 'Islandesa', 'Israelense', 'Italiano', 'Italiana', 'Jamaicano', 'Jamaicana', 'Japonês', 'Japonesa', 'Jordaniano', 'Cazaquistanês', 'Queniano', 'Kiribatiano', 'Kuwaitiano', 'Laosiano', 'Letão', 'Letã', 'Libanês', 'Libanesa', 'Liberiano', 'Líbio', 'Líbia', 'Liechtensteinense', 'Lituano', 'Lituana', 'Luxemburguês', 'Macedônio', 'Macedônia', 'Malagasy', 'Malaio', 'Maldiviano', 'Maliano', 'Maltês', 'Marroquino', 'Marroquina', 'Mauriciano', 'Mauritano', 'Mexicano', 'Mexicana', 'Micronésio', 'Moldávio', 'Moldávia', 'Monegasco', 'Mongol', 'Montenegrino', 'Moçambicano', 'Namibiano', 'Nauruano', 'Nepalês', 'Neozelandês', 'Neozelandesa', 'Nicaraguense', 'Nigeriano', 'Nigeriana', 'Norueguês', 'Norueguesa', 'Omani', 'Paquistanês', 'Palauano', 'Panamenho', 'Panamenha', 'Papuásio', 'Paraguaio', 'Paraguaia', 'Peruano', 'Peruana', 'Polonês', 'Polonesa', 'Português', 'Portuguesa', 'Quirguiz', 'Qatari', 'Britânico', 'Britânica', 'Romeno', 'Romena', 'Russo', 'Russa', 'Ruandês', 'Salomonense', 'Samoano', 'Sanmarinense', 'Santomeense', 'Saudita', 'Senegalês', 'Sérvio', 'Sérvia', 'Seichelense', 'Sierra-leonino', 'Singapurense', 'Síria', 'Somali', 'Sri-lankano', 'Suazi', 'Sudanês', 'Sudanese', 'Sueco', 'Sueca', 'Suíço', 'Suíça', 'Surinamês', 'Sírio', 'Tadjique', 'Tailandês', 'Tailandesa', 'Taiwanês', 'Tanzaniano', 'Togolês', 'Tonganês', 'Trinitário', 'Trinitária', 'Tunisiano', 'Tunisina', 'Turcomeno', 'Turco', 'Tuvaluano', 'Ucraniano', 'Ucraniana', 'Ugandense', 'Uruguaio', 'Uruguaia', 'Uzbeque', 'Vanuatuense', 'Venezuelano', 'Venezuelana', 'Vietnamita', 'Iemenita', 'Zambiano', 'Zimbabuano']

    return {
        brazilianStates,
        nationalities,
    }

}

// // composables/useDateConverter.js

// export default function useDateConverter() {
//     const convertDate = (originalDate) => {
//       const parts = originalDate.split("-");
//       return `${parts[2]}-${parts[1]}-${parts[0]}`;
//     }
  
//     return {
//       convertDate
//     }
// }
  