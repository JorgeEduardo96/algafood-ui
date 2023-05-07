import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable()
export class CozinhaForm {
    group: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.group = formBuilder.group({
            nome: formBuilder.control(null, [Validators.required])
        })
    }

    reset() {
        this.group?.reset();
    }

    init(cozinha: any) {
        this.group?.patchValue({
            nome: cozinha.nome,
        })
    }

    get cozinhaValue(): any {
        return {
           nome: this.group.get('nome')?.value
        } as any
    }

    get nome(): string {
        return this.group.get('nome')?.value;
    }
}