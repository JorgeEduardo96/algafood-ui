export class CidadeInput {    
    nome?: string;
    estado = new EstadoId();
}

export class EstadoId {
    id?: number;
}

export class Estado {
    id?: number;
    nome?: string;
}

export class CozinhaInput {
    nome?: string;
}