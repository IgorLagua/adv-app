<template>
    <div>
        <!-- <pre>{{ showButtonsEditor }}</pre> -->
        <div v-if="showButtonsEditor">
            <v-btn @click="toggleContent" color="blue" class="mt-4 mb-3">
                {{
                    viewEditModeButton
                        ? "Modo de Visualização"
                        : "Modo de Edição"
                }}
            </v-btn>
        </div>
        <!-- {{ showButtonsEditor }} -->
        <div :key="templates.updateEditorComponent">
            <editor
                apiKey="beqd8yl7s3pg27vjr9i2fm4j6l90rqgxnqd39ws6wuf0sdq4"
                :init="editorConfig"
                v-model="templatesFiles.content"
            />
        </div>

        <v-btn
            :disabled="viewEditModeButton"
            :loading="isLoading"
            color="blue"
            class="mt-4"
            @click="saveData"
            >Salvar</v-btn
        >

        <v-btn
            :disabled="!viewEditModeButton"
            color="blue"
            class="ml-4 mt-4"
            @click="printContent"
            >Imprimir</v-btn
        >

        <AdmCommonSnackbar
            v-if="showSnackbar"
            v-model="showSnackbar"
            :title="templatesFiles.selected.name"
            subTitle="Cadastrado com sucesso"
            color="green"
            :timeout="4000"
            icon="mdi-spellcheck"
        ></AdmCommonSnackbar>
    </div>
</template>


<script setup>
import Editor from "@tinymce/tinymce-vue";
import { useTemplatesStore } from "~/stores/adm/templates";
import { useTemplatesFilesStore } from "~/stores/adm/templatesFiles";

const templates = useTemplatesStore();
const templatesFiles = useTemplatesFilesStore();
const editorInstance = ref(null);

const editorConfig = ref({
    height: 600,
    setup: (editor) => {
        editorInstance.value = editor; // Aqui você obtém a instância do editor quando ele é inicializado
    },

    plugins: [
        "advlist",
        "autolink",
        "link",
        "image",
        "lists",
        "charmap",
        "preview",
        "anchor",
        "pagebreak",
        "searchreplace",
        "wordcount",
        "visualblocks",
        "visualchars",
        "code",
        "fullscreen",
        "insertdatetime",
        "media",
        "table",
        "emoticons",
        "template",
        "help",
    ],
    toolbar:
        " undo redo | blocks | " +
        "bold italic backcolor | alignleft aligncenter " +
        "alignright alignjustify | bullist numlist outdent indent | " +
        "removeformat | help ",
    content_style:
        "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
    language: "pt_BR",

    template_mdate_format: "%d/%m/%Y : %H:%M",

    template_replace_values: {
        /* nome1: 'Igor lagua Castro' */
    },

    templates: [],
});


const showButtonsEditor = computed(() => {
    const {
        peopleSelected,
        companiesSelected,
    } = templatesFiles.selected;

    return peopleSelected.length > 0 || companiesSelected.length > 0;
});

const viewEditModeButton = ref(false);

const toggleContent = () => {
    if (viewEditModeButton.value) {
        // Se estiver no modo de visualização, mude para o modo de edição
        editorInstance.value.mode.set("design");
        templatesFiles.content = templatesFiles.selected.content;
        editorInstance.value.setContent(templatesFiles.selected.content);
    } else {
        // Se estiver no modo de edição, mude para o modo de visualização
        editorInstance.value.setContent("");
        templatesFiles.selected.content = templatesFiles.content;
        editorInstance.value.execCommand(
            "mceInsertTemplate",
            false,
            templatesFiles.selected.content
        );
        editorInstance.value.mode.set("readonly");
    }
    viewEditModeButton.value = !viewEditModeButton.value;
};

watchEffect(() => {
    editorConfig.value.template_replace_values =
        templatesFiles.selected.templateReplaceValues || {};
});

const isLoading = ref(false);
// const saveData = () => {
async function saveData() {
    templatesFiles.selected.content = templatesFiles.content;

    isLoading.value = true;
    await templatesFiles.updateApiAction(templatesFiles.selected);
    updateSnackbar();
    await sleep(1000);
    isLoading.value = false;
}

function printContent() {
    // 1. Obtém o conteúdo do editor
    const editorContent = editorInstance.value.getContent();

    // 2. Cria uma nova janela para impressão
    const printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.open();

    // 3. Escreve o esqueleto básico do documento HTML
    printWindow.document.write("<html><head><title>Imprimir</title>");

    // 4. Adicione estilos para margens
    printWindow.document.write(`
			<style>
				body {
					margin: 50px;  /* Ajuste conforme necessário */
				}
			</style>
		`);

    // 5. Continua escrevendo o esqueleto básico do documento HTML
    printWindow.document.write("</head><body>");

    // 6. Adiciona o conteúdo do editor TinyMCE à nova janela
    printWindow.document.write(editorContent);

    // 7. Fecha o documento HTML
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    // 8. Foca na nova janela
    printWindow.focus();

    // 9. Iniciar a impressão após um pequeno atraso
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

const showSnackbar = ref(false);
function updateSnackbar() {
    showSnackbar.value = true;
}
</script>
