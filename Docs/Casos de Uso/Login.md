**Caso de Uso: Realizar Login no Sistema**

**Ator Principal:** Usuário

**Objetivo:** O usuário deseja acessar o sistema autenticando-se com suas credenciais.

**Pré-condições:**
1. O usuário possui uma conta registrada no sistema.
2. A página de login está acessível.

**Fluxo Básico:**

1. O usuário acessa a página de login do sistema.
2. O sistema exibe um formulário de login contendo os campos:
   - E-mail
   - Senha
3. O usuário insere suas credenciais nos campos correspondentes.
4. O sistema valida as informações fornecidas, verificando se o usuário está registrado e se a senha está correta.
5. Se as credenciais forem validadas com sucesso, o sistema redireciona o usuário para a página principal ou para a última página acessada antes do login.
6. O usuário está autenticado no sistema e pode acessar as funcionalidades restritas.

**Fluxo Alternativo:**

- Se as credenciais não forem válidas, o sistema exibe uma mensagem de erro indicando que o login falhou, e o usuário pode tentar novamente.

**Pós-condições:**

- O usuário está autenticado no sistema e tem acesso às funcionalidades restritas.

**Regras de Negócio:**

1. A senha deve ser protegida por práticas de segurança, como criptografia.
2. O sistema deve fornecer um mecanismo para redefinir a senha em caso de esquecimento.

**Exceções:**

1. Se ocorrer uma falha no sistema durante o processo de login, o usuário recebe uma mensagem de erro e é orientado a tentar novamente mais tarde.
2. Se o usuário tentar realizar login várias vezes consecutivas sem sucesso, o sistema pode impor uma política de bloqueio temporário para proteger contra tentativas de acesso não autorizado.

Este caso de uso descreve o processo pelo qual um usuário autenticado pode acessar o sistema, garantindo a segurança e a privacidade das informações por meio da validação de credenciais.