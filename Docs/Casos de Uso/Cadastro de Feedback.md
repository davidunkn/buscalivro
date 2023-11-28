**Caso de Uso: Cadastrar Feedback do Usuário**

**Ator Principal:** Usuário

**Objetivo:** O usuário deseja fornecer um feedback sobre sua experiência em uma livraria, biblioteca ou Sebo.

**Pré-condições:**
1. O usuário está autenticado no sistema.
2. A funcionalidade de cadastro de feedback está disponível.

**Fluxo Básico:**

1. O usuário acessa o mapa
2. O Usuário selecione o estabelecimento
3. O sistema exibe uma lista de feedbacks previamente caadastrados.
4. O usuário clica no botão de adicionar feedback
5. O sistema exibe um formulário de cadastro de feedback, incluindo campos relevantes, como um slider para nota e um campo de texto para o comentário.
6. O usuário preenche os campos do formulário com as informações necessárias.
7. Após preencher o formulário, o usuário seleciona a opção para enviar o feedback.
8. O sistema valida os dados inseridos, verificando se todos os campos obrigatórios foram preenchidos corretamente.
9. Se a validação for bem-sucedida, o sistema registra o feedback do usuário no banco de dados.

**Fluxo Alternativo:**

- Se a validação dos dados falhar (por exemplo, campos obrigatórios não preenchidos), o sistema exibe mensagens de erro específicas e solicita que o usuário corrija os campos destacados antes de prosseguir.

**Pós-condições:**

- O feedback do usuário é registrado no sistema para análise posterior.
- Os administradores podem acessar e revisar os feedbacks cadastrados.

**Regras de Negócio:**

1. Uma nota deve ser escolhida.
2. O comentário do feedback deve ser obrigatório e ter no máximo 500 palavras.

**Exceções:**

1. Se o usuário estiver desconectado durante o processo de cadastro do feedback, ele será redirecionado para a página de login e, após o login bem-sucedido, será direcionado novamente para a página de cadastro de feedback.
2. Se ocorrer uma falha no sistema durante o envio do feedback, o usuário receberá uma mensagem de erro e será orientado a tentar novamente mais tarde.

Este caso de uso descreve o processo pelo qual um usuário autenticado pode fornecer feedback sobre um serviço ou produto, contribuindo assim para a melhoria contínua do sistema.