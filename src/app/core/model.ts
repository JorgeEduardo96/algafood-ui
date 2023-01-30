export class Cidade {
    id?: number;
    nome?: string;
    estado = new Estado();
}

export class Estado {
    id?: number;
    nome?: string;
}