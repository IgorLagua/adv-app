import { defineStore } from 'pinia';
import actions from './actions';
import getters from './getters';

export const useTemplatesFilesStore = defineStore('templatesFiles', {
    state: () => ({

        // showDialog: false,
        // showEditor: false,
        // showFilterQuantity: false,
		// updateEditorComponent: 0,
        // nameDialog: null,
        // openModalForm: false,
        // storeForm: false,
        // editForm: false,

        selected: null,
        // selectedTable: [],
        
        // search: null,
        // formData: {},
        content: '',

		dataStoreAutoComplete: [],
		dataStoreTable: [],
		dataAutoComplete: [],
		dataStore: [],	//grava todos os retornos de dados dos modelos
		dataTable: [],
		totalItems: 0,

		// filesDataStoreAutoComplete: [],
		// filesDataStoreTable: [],
		// filesDataAutoComplete: [],		
		// filesDataStore: [],	//grava todos os retornos de dados dos modelos
		// filesDataTable: [],
		// filesTotalItems: 0,

		apiErrors: {},


		// filesDataStoreAutoComplete: [],
		// filesDataStoreTable: [],
		// filesDataAutoComplete: [],		
		// filesDataStore: [],	//grava todos os retornos de dados dos modelos
		// filesDataTable: [],
		// filesTotalItems: 0,

	

		// categoriesDataStore: [],
        // categoriesData: [
           
        //     {
        //         id: 3,
        //         name: 'Cobranças',
        //         description: 'Cobranças',
        //     },
        //     {
        //         id: 2,
        //         name: 'Cabeçalhos',
        //         description: 'Cabeçalhos',
        //     },
        //     {
        //         id: 1,
        //         name: 'Contratos',
        //         description: 'Contratos',
        //     },
        // ],


        // filesData: [
        //     {
        //         id: 10,
        //         categoryId: 1,
        //         quantityPeople: 2,
        //         quantityCompanies: null,
        //         peopleSelected: [],
        //         companiesSelected: [],
		// 		templateReplaceValues: {},
        //         name: 'Contrato Aluguel teste',
        //         description: 'Contratos',
		// 		content: `
		// 					<p class="MsoNormal" style="text-align: center;" align="center" data-mce-style="text-align: center;"><strong
		// 						style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><u><span
		// 								style="font-size: 12.0pt;" data-mce-style="font-size: 12.0pt;">CONTRATO PARTICULAR DE LOCAÇÃO DE
		// 								IMÓVEL RESIDENCIAL COM GARANTIA LOCATÍCIA</span></u></strong></p>
		// 				<p class="MsoNormal" style="text-align: center;" align="center" data-mce-style="text-align: center;"><br
		// 						data-mce-bogus="1"></p>
		// 				<p class="MsoNormal" style="text-align: center;" align="center" data-mce-style="text-align: center;"><strong
		// 						style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><u><span
		// 								style="font-size: 12.0pt;" data-mce-style="font-size: 12.0pt;">DA IDENTIFICAÇÃO E QUALIFICAÇÃO DAS
		// 								PARTES CONTRATANTES</span></u></strong></p>
		// 				<p class="MsoNormal" style="text-align: justify;" data-mce-style="text-align: justify;"><br data-mce-bogus="1"></p>
		// 				<p class="MsoNormal" style="text-align: justify;" data-mce-style="text-align: justify;"><strong
		// 						style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><u><span
		// 								style="font-size: 12.0pt;" data-mce-style="font-size: 12.0pt;">CLÁUSULA
		// 								PRIMEIRA:</span></u></strong><span style="font-size: 12.0pt;" data-mce-style="font-size: 12.0pt;">
		// 						As partes que convencionam o presente ajuste de vontades são as seguintes:</span></p>
		// 				<p class="MsoNormal" style="text-align: justify;" data-mce-style="text-align: justify;"><span style="font-size: 12.0pt;"
		// 						data-mce-style="font-size: 12.0pt;">&nbsp;</span><span style="font-size: 12.0pt;"
		// 						data-mce-style="font-size: 12.0pt;">&nbsp;</span></p>
		// 				<p class="MsoNormal"
		// 					style="text-align: justify; text-indent: 0cm; line-height: 115%; mso-list: l0 level1 lfo1; margin: 0cm 0cm 10.0pt 0cm;"
		// 					data-mce-style="text-align: justify; text-indent: 0cm; line-height: 115%; mso-list: l0 level1 lfo1; margin: 0cm 0cm 10.0pt 0cm;">
		// 					<strong style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><span
		// 							style="font-size: 12.0pt; line-height: 115%;" data-mce-style="font-size: 12.0pt; line-height: 115%;"><span
		// 								style="mso-list: Ignore;" data-mce-style="mso-list: Ignore;">I.<span
		// 									style="font: 7.0pt 'Times New Roman';" data-mce-style="font: 7.0pt 'Times New Roman';">
		// 									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		// 								</span></span></span></strong><strong style="mso-bidi-font-weight: normal;"
		// 						data-mce-style="mso-bidi-font-weight: normal;"><u><span style="font-size: 12.0pt; line-height: 115%;"
		// 								data-mce-style="font-size: 12.0pt; line-height: 115%;">{$nome1},</span></u></strong><span
		// 						style="font-size: 12.0pt; line-height: 115%;" data-mce-style="font-size: 12.0pt; line-height: 115%;">
		// 						{$nacionalidade1}, {$estado-civil1}, {$profissao1}, portador do R.G nº {$rg1}, e do C.P.F nº {$cpf1},
		// 						residente e domiciliado na {$endereco1}, nº {$numero1} - {$bairro1}, nesta cidade de {$cidade1}/{$estado1},
		// 						doravante denominada apenas <strong style="mso-bidi-font-weight: normal;"
		// 							data-mce-style="mso-bidi-font-weight: normal;"><u>LOCADOR;</u></strong></span>
		// 				</p>
		// 				<p class="MsoNormal" style="margin-bottom: 10.0pt; text-align: justify; line-height: 115%;"
		// 					data-mce-style="margin-bottom: 10.0pt; text-align: justify; line-height: 115%;"><span
		// 						style="font-size: 12.0pt; line-height: 115%;"
		// 						data-mce-style="font-size: 12.0pt; line-height: 115%;">&nbsp;</span></p>
		// 				<p style="margin-left: 0cm; text-align: justify; text-indent: 0cm; line-height: 115%; mso-list: l0 level1 lfo1;"
		// 					data-mce-style="margin-left: 0cm; text-align: justify; text-indent: 0cm; line-height: 115%; mso-list: l0 level1 lfo1;">
		// 					<strong style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><span
		// 							style="mso-list: Ignore;" data-mce-style="mso-list: Ignore;">II.<span style="font: 7.0pt 'Times New Roman';"
		// 								data-mce-style="font: 7.0pt 'Times New Roman';">
		// 								&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		// 							</span></span></strong><strong style="mso-bidi-font-weight: normal;"
		// 						data-mce-style="mso-bidi-font-weight: normal;"><u>{$nome2},</u></strong> <span
		// 						style="font-size: 12.0pt; line-height: 115%;"
		// 						data-mce-style="font-size: 12.0pt; line-height: 115%;">{$nacionalidade2}, {$estado-civil2}, {$profissao2},
		// 						portador do R.G nº {$rg2}, e do C.P.F nº {$cpf2}, residente e domiciliado na {$endereco2}, nº {$numero2} -
		// 						{$bairro2}, nesta cidade de {$cidade2}/{$estado2}, doravante denominada apenas</span> <strong
		// 						style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><u>LOCATÁRIO;</u></strong>
		// 				</p>
		// 				<p style="text-align: justify; line-height: 115%;" data-mce-style="text-align: justify; line-height: 115%;"><br
		// 						data-mce-bogus="1"></p>
		// 				<p class="MsoNormal" style="text-align: center;" align="center" data-mce-style="text-align: center;"><strong
		// 						style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><u><span
		// 								style="font-size: 12.0pt;" data-mce-style="font-size: 12.0pt;">DA DECLARAÇÃO DE POSSE IMOBILIÁRIA DO
		// 								LOCADOR</span></u></strong></p>
		// 				<p class="MsoNormal" style="text-align: center;" align="center" data-mce-style="text-align: center;"><br
		// 						data-mce-bogus="1"></p>
		// 				<p class="MsoNormal" style="text-align: justify;" data-mce-style="text-align: justify;"><strong
		// 						style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><u><span
		// 								style="font-size: 12.0pt;" data-mce-style="font-size: 12.0pt;">CLÁUSULA
		// 								SEGUNDA:</span></u></strong><span style="font-size: 12.0pt;" data-mce-style="font-size: 12.0pt;"> O
		// 						<strong style="mso-bidi-font-weight: normal;"
		// 							data-mce-style="mso-bidi-font-weight: normal;"><u>LOCADOR</u></strong> declara para todos os fins legais
		// 						e de direito, que é possuidor e proprietário do imóvel objeto da presente locação, nos termos descritos na
		// 						cláusula abaixo, declarando ainda, que o está locando sem qualquer embaraço fático ou jurídico que frustre
		// 						ou dificulte o uso e gozo do mesmo pelo <strong style="mso-bidi-font-weight: normal;"
		// 							data-mce-style="mso-bidi-font-weight: normal;"><u>LOCATÁRIO</u></strong>.</span></p>
		// 				<p class="MsoNormal" style="text-align: justify;" data-mce-style="text-align: justify;"><span style="font-size: 12.0pt;"
		// 						data-mce-style="font-size: 12.0pt;">&nbsp;</span><span style="font-size: 12.0pt;"
		// 						data-mce-style="font-size: 12.0pt;">&nbsp;</span></p>
		// 				<p class="MsoNormal" style="text-align: center;" align="center" data-mce-style="text-align: center;"><strong
		// 						style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><u><span
		// 								style="font-size: 12.0pt;" data-mce-style="font-size: 12.0pt;">DO OBJETO
		// 								CONTRATUAL</span></u></strong></p>
		// 				<p class="MsoNormal" style="text-align: justify;" data-mce-style="text-align: justify;"><strong
		// 						style="mso-bidi-font-weight: normal;" data-mce-style="mso-bidi-font-weight: normal;"><u><span
		// 								style="font-size: 12.0pt;" data-mce-style="font-size: 12.0pt;">CLÁUSULA
		// 								TERCEIRA:</span></u></strong><strong style="mso-bidi-font-weight: normal;"
		// 						data-mce-style="mso-bidi-font-weight: normal;"><span style="font-size: 12.0pt;"
		// 							data-mce-style="font-size: 12.0pt;"> </span></strong><span style="font-size: 12.0pt;"
		// 						data-mce-style="font-size: 12.0pt;">O imóvel objeto da presente locação trata-se de residência, situada na
		// 						Rua José Tumenas, nº 48, Jardim Residencial Regina Bastelli, CEP: 13481-187, na cidade de Limeira/SP,
		// 						composta por uma cozinha, um quarto, um banheiro e lavanderia.</span></p>
		// 				`
			
		// 	},
        //     {
        //         id: 9,
        //         categoryId: 1,
		// 		quantityPeople: 1,
        //         quantityCompanies: null,
        //         peopleSelected: [],
        //         companiesSelected: [],
		// 		templateReplaceValues: {},
        //         name: 'Contrato combrança',
        //         description: 'Contratos',
        //         content: '<h2 style="text-align: center;">{$nome1} Welcome to the TinyMCE editor demo!</h2>' +
        //         '<h2>Got questions or need help?</h2>' +
        //         '<ul>' +
        //         '<li>Our <a href="../">documentation</a> is a great resource for learning how to configure TinyMCE.</li>' +
        //         '<li>Have a specific question? Try the <a href="https://stackoverflow.com/questions/tagged/tinymce" target="_blank" rel="noopener"><code>tinymce</code> tag at Stack Overflow</a>.</li>' +
        //         '<li>We also offer enterprise grade support as part of <a href="../pricing">TinyMCE premium plans</a>.</li>' +
        //         '</ul>' +
        //         '<h2>A simple table to play with</h2>' +
        //         '<table style="border-collapse: collapse; width: 100%;" border="1">' +
        //         '<thead>' +
        //         '<tr>' +
        //         '<th>Product</th>' +
        //         '<th>Cost</th>' +
        //         '<th>Really?</th>' +
        //         '</tr>' +
        //         '</thead>' +
        //         '<tbody>' +
        //         '<tr>' +
        //         '<td>TinyMCE</td>' +
        //         '<td>Free</td>' +
        //         '<td>YES!</td>' +
        //         '</tr>' +
        //         '<tr>' +
        //         '<td>Plupload</td>' +
        //         '<td>Free</td>' +
        //         '<td>YES!</td>' +
        //         '</tr>' +
        //         '</tbody>' +
        //         '</table>' +
        //         '<p>&nbsp;</p>'
        //     },
        //     {
        //         id: 8,
        //         categoryId: 1,
		// 		quantityPeople: 1,
        //         quantityCompanies: null,
        //         peopleSelected: [],
        //         companiesSelected: [],
		// 		templateReplaceValues: {},
        //         name: 'Contrato aluguel',
        //         description:'Contrato',
        //         content: '<p> {$nome1} Este c&oacute;digo &eacute; um componente Vue usando Vuetify, uma biblioteca de componentes Vue. Vamos focar na fun&ccedil;&atilde;o <code>customFilter</code> que voc&ecirc; mencionou.</p>' +
        //         '<h3>Fun&ccedil;&atilde;o <code>customFilter</code></h3>' +
        //         '<p>A fun&ccedil;&atilde;o <code>customFilter</code> &eacute; usada pelo componente <code>v-autocomplete</code> para filtrar os itens da lista de sugest&otilde;es baseados no texto que o usu&aacute;rio digita. Esta fun&ccedil;&atilde;o recebe tr&ecirc;s argumentos:</p>' +
        //         '<ol>' +
        //         '<li><p><code>itemTitle</code>: O t&iacute;tulo do item, que &eacute; o valor da propriedade definida pela prop <code>item-title</code> do componente <code>v-autocomplete</code>, neste caso, <code>"name"</code>.</p></li>' +
        //         '<li><p><code>queryText</code>: O texto que o usu&aacute;rio digitou no campo de autocomplete.</p></li>' +
        //         '<li><p><code>item</code>: O item atual sendo processado. Este &eacute; um objeto que cont&eacute;m informa&ccedil;&otilde;es adicionais sobre o item, incluindo uma propriedade <code>raw</code> que cont&eacute;m o objeto original (por exemplo, <code>{ name: \'Florida\', abbr: \'FL\', id: 1 }</code>).</p></li>' +
        //         '</ol>',
        //     },
        //     {
        //         id: 7,
        //         categoryId: 1,
		// 		quantityPeople: 1,
        //         quantityCompanies: null,
        //         peopleSelected: [],
        //         companiesSelected: [],
		// 		templateReplaceValues: {},
        //         name: 'Contrato venda',
        //         description:'Contrato',
        //         content: '<h3> {$nome1} Como <code>customFilter</code> Funciona</h3>' +
        //         '<p>A fun&ccedil;&atilde;o <code>customFilter</code> compara o texto da consulta (<code>queryText</code>) com o nome e a abrevia&ccedil;&atilde;o do estado (<code>abbr</code>) de cada item na lista <code>states</code>. Se o texto da consulta estiver presente em qualquer um desses campos (ignorando mai&uacute;sculas e min&uacute;sculas), a fun&ccedil;&atilde;o retorna <code>true</code>, indicando que o item deve ser inclu&iacute;do na lista filtrada de sugest&otilde;es. Se n&atilde;o, retorna <code>false</code>.</p>' +
        //         '<p>Aqui est&aacute; um passo a passo do que a fun&ccedil;&atilde;o faz:</p>',
        //     },
        //     {
        //         id: 6,
        //         categoryId: 2,
		// 		quantityPeople: 1,
        //         quantityCompanies: null,
        //         peopleSelected: [],
        //         companiesSelected: [],
		// 		templateReplaceValues: {},
        //         name: 'Cabeçalho cobrança',
        //         description:'Cabeçalho',
        //         content: `<ol>
		// 					<li>
		// 						<p><strong> {$nome1} Normalização de Texto:</strong></p>
		// 						<ul>
		// 							<li><code>textOne</code> é o nome do estado convertido para minúsculas.</li>
		// 							<li><code>textTwo</code> é a abreviação do estado convertido para minúsculas.</li>
		// 							<li><code>searchText</code> é o texto da consulta convertido para minúsculas.</li>
		// 						</ul>
		// 					</li>
		// 					<li>
		// 						<p><strong>Comparação de Texto:</strong></p>
		// 						<ul>
		// 							<li>A função verifica se <code>textOne</code> ou <code>textTwo</code> contém <code>searchText</code>.</li>
		// 							<li>Se <code>searchText</code> estiver presente em qualquer um deles, a função retorna <code>true</code>.</li>
		// 							<li>Se <code>searchText</code> não estiver presente em nenhum deles, a função retorna <code>false</code>.</li>
		// 						</ul>
		// 					</li>
		// 				</ol>`,
        //     },
        //     {
        //         id: 5,
        //         categoryId: 2,
		// 		quantityPeople: 1,
        //         quantityCompanies: null,
        //         peopleSelected: [],
        //         companiesSelected: [],
		// 		templateReplaceValues: {},
        //         name: 'Cabeçalho processo',
        //         description:'Cabeçalho',
        //         content: `<ol>
		// 					<li>
		// 						<p><strong> {$nome1} Importação de Componentes:</strong> Você não precisa registrar componentes usando a opção <code>components</code>. Em vez disso, você pode simplesmente importar o componente e usá-lo no template.</p>
		// 					</li>
		// 					<li>
		// 						<p><strong>Dados Reactivos:</strong> Você usa <code>ref</code> para criar dados reativos, em vez de <code>data()</code>. Você precisa importar <code>ref</code> de <code>vue</code>.</p>
		// 					</li>
		// 					<li>
		// 						<p><strong>Propriedades Computadas e Métodos:</strong> Você pode definir propriedades computadas e métodos diretamente no corpo do <code>&lt;script setup&gt;</code>, sem precisar colocá-los em opções específicas.</p>
		// 					</li>
		// 					<li>
		// 						<p><strong>Configurações do Editor:</strong> A configuração do editor foi movida para uma constante <code>editorConfig</code> para manter o template limpo.</p>
		// 					</li>
		// 				</ol>`,
        //     },
        //     {
        //         id: 4,
        //         categoryId: 2,
		// 		quantityPeople: 1,
        //         quantityCompanies: null,
        //         peopleSelected: [],
        //         companiesSelected: [],
		// 		templateReplaceValues: {},
        //         name: 'Cabeçalho petição',
        //         description:'Cabeçalho',
        //         content: `<ol>
		// 					<li>
		// 						<h3>3. <strong> {$nome1} Usar o TinyMCE Localmente</strong></h3>
		// 						<p>Se você preferir não usar a Tiny Cloud, você pode hospedar o TinyMCE localmente. Isso envolve baixar o TinyMCE e servir os arquivos a partir do seu próprio servidor. Você pode encontrar instruções sobre como fazer isso na <a href="https://www.tiny.cloud/docs/general-configuration-guide/use-tinymce-offline/" target="_new">documentação oficial do TinyMCE</a>.</p>
		// 					</li>
		// 				</ol>`,
        //     },
        //     {
        //         id: 3,
        //         categoryId: 3,
		// 		quantityPeople: 1,
        //         quantityCompanies: null,
        //         peopleSelected: [],
        //         companiesSelected: [],
		// 		templateReplaceValues: {},
        //         name: 'Cobrança padrão devedor',
        //         description:'Cobrança',
        //         content: '<h3>4. <strong> {$nome1} Desabilitar a Tiny Cloud</strong></h3> <p>Se voc&ecirc; n&atilde;o precisa dos servi&ccedil;os da Tiny Cloud, voc&ecirc; pode configurar o TinyMCE para rodar em modo offline, desabilitando assim a Tiny Cloud. Voc&ecirc; pode fazer isso adicionando a seguinte configura&ccedil;&atilde;o:</p>',
        //     },
        //     {
        //         id: 2,
        //         categoryId: 3,
		// 		quantityPeople: 1,
        //         quantityCompanies: null,
        //         peopleSelected: [],
        //         companiesSelected: [],
		// 		templateReplaceValues: {},
        //         name: 'Cobrança padrão clinica yyy',
        //         description:'Cobrança',
        //         content: '<h3>1. <strong> {$nome1} Registrar o Dom&iacute;nio</strong></h3> <p>Voc&ecirc; pode registrar seu dom&iacute;nio com a Tiny Cloud. Para fazer isso, voc&ecirc; precisa: a. Criar uma conta em <a href="https://www.tiny.cloud/auth/signup/" target="_new">Tiny Cloud</a>. b. Ap&oacute;s o login, adicione seu dom&iacute;nio &agrave; lista de dom&iacute;nios autorizados. c. Obtenha sua API Key e adicione-a &agrave; configura&ccedil;&atilde;o do TinyMCE no seu projeto.</p>',
        //     },
        //     {
        //         id: 1,
        //         categoryId: 3,
		// 		quantityPeople: 1,
        //         quantityCompanies: null,
        //         peopleSelected: [],
        //         companiesSelected: [],
		// 		templateReplaceValues: {},
        //         name: 'Cobrança padrão clinica xxx',
        //         description:'Cobrança',
        //         content: "<h3>2. <strong> {$nome1} Usar uma API Key</strong></h3> <p>Se voc&ecirc; j&aacute; tem uma API Key, voc&ecirc; precisa adicion&aacute;-la &agrave; configura&ccedil;&atilde;o do TinyMCE no seu projeto. Aqui est&aacute; um exemplo de como voc&ecirc; pode fazer isso:</p>",
        //     },
        // ]

    }),
    getters,
    actions,

});



  