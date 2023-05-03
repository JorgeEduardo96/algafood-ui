export class Cidade {
    id?: number;
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