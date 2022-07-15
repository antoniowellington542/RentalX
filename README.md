# RentalX

**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regras de negócio

# Cadastro de veiculo

**RF**
- [x] Deve ser possível cadastrar um novo veiculo.

**RN**
- [x] Não deve ser possível cadastrar um veiculo com uma placa já existente.
- [x] O veiculo deve ser cadastrado com o status de disponivel.
- [] Não deve ser possível usuarios comuns cadastrarem veiculos.

# Listagem de veiculos

**RF**
- [] Deve ser possível listar todos os veiculos disponiveis.
- [] Deve ser possível listar todos os veiculos disponiveis pelo nome da categoria.
- [] Deve ser possível listar todos os veiculos disponiveis pelo nome da marca
- [] Deve ser possível listar todos os veiculos disponiveis pelo nome do carro.
**RN**
- [] O usuario não precisa estar logado no sistema.

# Cadastro de Especificação no veiculo

**RF**
- [] Deve ser possível cadastrar uma especificação para um veiculo.
- [] Deve ser possível listar todas as especificações 
- [] Deve ser possível listar todos os carros

**RN**
- [] Não deve ser possível cadastrar uma especificação para um veiculo não cadastrado.
- [] Não deve ser possível cadastrar uma especificação já existente para o mesmo veiculo.
- [] Não deve ser possível usuarios comuns cadastrarem especificações de veiculos.

# Cadastro de imagens do carro

**RF**
- [] Deve ser possível cadastrar a imagen do carro.
- [] Deve ser possível listar todos os carros.

**RNF**
- [] Utilizar o multer para upload dos arquivos.

**RN**
- [] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [] O usuário responsável pelo cadastro deve ser um usuário administrador.


# Aluguel do veículo

**RF**
- [] Deve ser possível cadastrar um aluguel.

**RNF**

**RN**
- [] O aluguel deve ter duração mínima de 24 horas.
- [] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo veiculo.

# Atualizar carro
- [] Não deve ser possível alterar a placa de um veiculo já cadastrado.