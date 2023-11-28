**Caso de Uso: Realizar Logout do Sistema**

**Ator Principal:** Usuário

**Objetivo:** O usuário deseja encerrar a sessão no sistema, desconectando-se e garantindo a segurança de sua conta.

**Pré-condições:**
1. O usuário está autenticado no sistema.

**Fluxo Básico:**

1. O usuário acessa a opção de Usuário, e seleciona Sair.
2. O sistema confirma a intenção do usuário de efetuar logout.
3. O sistema encerra a sessão do usuário, invalidando suas credenciais e removendo qualquer informação de autenticação armazenada localmente.
4. O sistema redireciona o usuário para a página de login ou para a página inicial, indicando que a sessão foi encerrada com sucesso.

**Fluxo Alternativo:**

- Se o usuário estiver inativo por um período prolongado, o sistema pode encerrar automaticamente a sessão (timeout de sessão) para garantir a segurança da conta.

**Pós-condições:**

- O usuário está desconectado do sistema e não tem mais acesso às funcionalidades restritas.

**Regras de Negócio:**

1. Após o logout, o sistema não deve mais reconhecer as credenciais do usuário, mesmo que a página anterior seja acessada novamente.
2. Se o usuário tentar acessar uma página restrita após o logout, o sistema deve redirecioná-lo para a página de login.

**Exceções:**

1. Se ocorrer uma falha no sistema durante o processo de logout, o usuário pode ser informado do problema, mas a sessão ainda deve ser encerrada.
2. Se o usuário tentar realizar ações que exigem autenticação após o logout, o sistema deve tratar essas ações como não autorizadas.

Este caso de uso descreve o processo pelo qual um usuário pode encerrar sua sessão no sistema, garantindo a segurança de sua conta e restringindo o acesso não autorizado.