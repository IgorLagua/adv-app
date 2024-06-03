## Lembretes

Para subir a aplicação entrar no linux até a pasta:
cd projetos/advocacia/api

- Executar o comando:



- Entrar no navegador
http://localhost:3000

- Instalações de pacotes
Vuetify: npm install --save-dev @invictus.codes/nuxt-vuetify
Maska: npm i maska
Pinia: npm install @pinia/nuxt
    Se estiver usando o npm, poderá encontrar um erro na instalação da dependência. Nesse caso, adicione o seguinte código no package.json:
        "overrides": {
            "vue": "latest"
        }
Pinia plugin-persistedstate: npm i -D @pinia-plugin-persistedstate/nuxt
npm i @tinymce/tinymce-vue

- Atualizações 
NPM: npm update
Nuxt: npx nuxi upgrade --force
Pinia: npm i pinia
pinia/nuxt: npm i @pinia/nuxt
npm i -D @pinia-plugin-persistedstate/nuxt
Vuetify: npx nuxi@latest module add vuetify-nuxt-module (npm update ja atualiza o Vuetify)
Maska: npm i maska

Exemplo para planos
https://advbox.com.br/planos/

https://www.youtube.com/watch?v=yLK0wQVu4s4&list=PLcoYAcR89n-oU266D5Dy6DT-H8npny_qJ&index=16
Acrescentar um objeto de cor no botão de escolha de planos no componente DialogPersonalize


Base para Layout
https://materialpro-vue3-admin.vercel.app/dashboards/analytical

retirei "@types/node": "^18.17.3" do package.json --> precisa testar --> depois apagar esse texto
// "devDependencies": {
//     "@invictus.codes/nuxt-vuetify": "^0.3.0",
//     "@nuxt/devtools": "latest",
//     "@pinia-plugin-persistedstate/nuxt": "^1.2.0",
//     "@types/node": "^18.17.3",
//     "nuxt": "^3.9.1"
//   },


# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
