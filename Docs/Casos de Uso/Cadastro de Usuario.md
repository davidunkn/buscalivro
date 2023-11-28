**Caso de Uso: Cadastrar Usuário**

**Ator Principal:** Usuário

**Objetivo:** O usuário deseja se cadastrar no sistema para obter acesso aos recursos e funcionalidades disponíveis.

**Pré-condições:**
1. O usuário acessa a página de cadastro.
2. A funcionalidade de cadastro de usuário está disponível.

**Fluxo Básico:**

1. O usuário acessa a página de cadastro do sistema.
2. O sistema exibe um formulário de cadastro com os seguintes campos:
   - Nome
   - Sobrenome
   - E-mail
   - Senha
   - Confirmar Senha
3. O usuário preenche os campos do formulário com as informações necessárias.
4. O sistema realiza validações nos dados inseridos, verificando a conformidade com as regras de negócio estabelecidas.
5. Se a validação for bem-sucedida, o sistema prossegue para o próximo passo. Caso contrário, mensagens de erro específicas são exibidas, indicando quais campos precisam ser corrigidos.
6. O usuário revisa as informações fornecidas e confirma o cadastro.
7. O sistema registra o novo usuário no banco de dados, associando as informações fornecidas ao seu perfil.
8. Uma mensagem de confirmação é exibida, informando ao usuário que o cadastro foi realizado com sucesso.

**Fluxo Alternativo:**

- Se o e-mail fornecido pelo usuário já estiver registrado no sistema, o sistema exibe uma mensagem de erro indicando a necessidade de escolher um e-mail único.

**Pós-condições:**

- O usuário está cadastrado no sistema e pode realizar o login para acessar as funcionalidades restritas.

**Regras de Negócio:**

1. O nome e sobrenome do usuário devem ter no máximo 50 caracteres cada.
2. O e-mail fornecido deve ser único no sistema.
3. A senha deve atender aos requisitos de segurança estabelecidos, como ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.
4. A senha e a confirmação de senha devem coincidir.

**Exceções:**

1. Se o usuário desistir do processo de cadastro, ele pode cancelar a operação a qualquer momento, retornando à página inicial ou a uma página de login.
2. Se ocorrer uma falha no sistema durante o processo de cadastro, o usuário receberá uma mensagem de erro e será orientado a tentar novamente mais tarde.

Este caso de uso descreve o processo pelo qual um usuário pode se cadastrar no sistema, fornecendo informações básicas, garantindo a segurança e integridade dos dados cadastrados.