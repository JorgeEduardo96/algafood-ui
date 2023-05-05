import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Injectable()
export class CidadeForm {
    group: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.group = formBuilder.group({           
            nome: formBuilder.control(null, [Validators.required]),
            estado: formBuilder.control(undefined, [Validators.required])
        })
    }

    reset() {
        this.group?.reset();
    }

    init(cidade: any) {
        this.group?.patchValue({
            nome: cidade.nome,
            estado: cidade.estado.id
        })
    }

    get cidadeValue(): any {
        return {
           nome: this.group.get('nome')?.value,
           estado: {
            id: this.group.get('estado')?.value
           }
        } as any
    }


    get nome(): string {
        return this.group.get('nome')?.value;
    }

}