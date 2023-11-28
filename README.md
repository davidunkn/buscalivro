# Busca Livro
Projeto - TADS 2023.2
Desenvolvido em MEVN Stack

# Como usar
Entre nas pasta de cliente e instale os modulos do front-end

    cd client
    npm install

Em seguida entre na pasta do server e instale os modulos do back-end

    cd server
    npm install
Crie um arquivo .env na pasta do servidor e preencha as variaveis com seus valores

    MONGO_URI=<uri do mongodb>
    PORT=3000
    ACCESS_TOKEN_SECRET=<hash com 128 caracteres em hexadecimal>
    REFRESH_TOKEN_SECRET=<hash com 128 caracteres em hexadecimal>
Crie um arquivo .env na pasta do cliente e preencha as variaveis com seus valores

    VITE_API_URL=<BASE URL do Front>
Rode as instancias separadas usando os comandos abaixo caso queira usar a versão de desenvolvimento

    cd client
    npm run dev
    cd ..
    cd server
    npm run dev
