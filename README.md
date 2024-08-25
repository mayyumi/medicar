# Medicar - Sistema de Marcação de Consultas

## 📖 Descrição do Projeto
O Medicar é um sistema completo de marcação de consultas médicas, desenvolvido para facilitar o agendamento de consultas por pacientes, oferecendo uma interface amigável e intuitiva para a seleção de especialidades, médicos, datas e horários. Este projeto é dividido em duas partes: o frontend, responsável pela interface do usuário, e o backend, que gerencia as regras de negócios e a persistência de dados.

## 🖥️ Frontend

### 🎨 Layout e Especificações Técnicas
O layout do frontend foi desenvolvido no [Figma](https://www.figma.com/) está disponível nesse [link](https://www.figma.com/file/kJIvTRUJtKin3PFthaGXnj/Desafio-Full-Stack-Intmed?node-id=0%3A1).

O fluxo de marcação de consultas segue os seguintes passos:

1. **Escolha da especialidade**: O paciente seleciona a especialidade médica desejada.
2. **Seleção do médico**: Aparecem todos os médicos disponíveis para a especialidade escolhida.
3. **Seleção da data**: O paciente escolhe uma data em que o médico está disponível.
4. **Seleção do horário**: O paciente seleciona o horário disponível para a data escolhida.
5. **Confirmação da consulta**: O paciente confirma o agendamento da consulta.

### 🔧 Funcionalidades Implementadas
- **Marcação de consultas**: O paciente pode escolher a especialidade, médico, data e horário para agendar uma consulta.
- **Validações de agendamento**: Não é permitido marcar uma consulta para o mesmo especialista no mesmo dia e horário.
- **Visualização de consultas**: O paciente pode visualizar apenas as suas consultas agendadas.

### 📦 Bibliotecas Utilizadas
- **MUI (Material-UI):** Biblioteca de componentes React para estilização e interface de usuário.
- **SweetAlert2:** Biblioteca para exibir alertas estilizados e modais interativos.

## 🛠️ Backend

### 🔧 Ajustes e Funcionalidades
- **Validações de agendamento**: Implementadas para garantir que um paciente não possa agendar uma consulta para o mesmo especialista no mesmo dia e horário.
- **Validação de email**: Durante o cadastro, é verificado se o email já está sendo utilizado. Se o email estiver em uso, o cadastro não será concluído.
- **Autenticação de usuário**: Após o login, o usuário visualiza apenas as suas consultas agendadas.

### 📦 Bibliotecas Utilizadas
- **uuid:** Biblioteca para gerar identificadores únicos universais (UUIDs) utilizados no backend.

## 🚀 Como Executar o Projeto

### ⚙️ Configurando o Backend

Navegue até a pasta do backend:

```cd backend```

Para instalar os pacotes necessários da aplicação, basta rodar o seguinte comando no seu terminal:

```$ npm install ```

Apos a instalação dos pacotes ser concluída, inicie a aplicação com o seguinte comando:

```$ npm run start ```

Com isso, a aplicação estará rodando na porta 3000

### ⚙️ Configurando o Frontend

```cd frontend```

Para instalar os pacotes necessários da aplicação, basta rodar o seguinte comando no seu terminal:

```$ npm install ```

Apos a instalação dos pacotes ser concluída, inicie a aplicação com o seguinte comando:

```$ npm run start ```

Com isso, a aplicação estará rodando na porta 3001
