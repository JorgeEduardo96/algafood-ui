export class CidadeInput {    
    nome?: string;
    estado = new EstadoIdInput();
}

export class CidadeIdInput {
    id?: number;
}

export class EstadoIdInput {
    id?: number;
}

export class Estado {
    id?: number;
    nome?: string;
}

export class CozinhaInput {
    nome?: string;
}

export class CozinhaIdInput {
    id?: number;
}

export class GrupoInput {
    nome?: string;
}

export class EstadoInput {
    nome?: string;
}

export class RestauranteInput {
    nome?: string;
    taxaFrete?: number;
    cozinhaId = new CozinhaIdInput();
    endereco = new EnderecoInput();
}

export class EnderecoInput {
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidadeId = new CidadeIdInput();
}