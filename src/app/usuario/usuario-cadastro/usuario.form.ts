import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable()
export class UsuarioForm {
    group: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.group = formBuilder.group({
            nome: formBuilder.control(null, [Validators.required]),
            email: formBuilder.control(null, [Validators.required]),
            senha: formBuilder.control(null, [Validators.required])
        });
    }

    reset() {
        this.group?.reset();
    }

    init(usuario: any) {
        this.group?.patchValue({
            nome: usuario.nome,
            email: usuario.email
        })
    }

    get usuarioValue(): any {
        return {
            ...this.group.value,
        } as any
    }

    get nome(): string {
        return this.group.get('nome')?.value;
    }

    get senha(): string {
        return this.group.get('senha')?.value;
    }

}