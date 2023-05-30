import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable()
export class FormaPagamentoForm {
    group: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.group = formBuilder.group({
            descricao: formBuilder.control(null, [Validators.required])
        })
    }

    reset() {
        this.group?.reset();
    }

    init(formaPagamento: any) {
        this.group?.patchValue({
            descricao: formaPagamento.descricao
        })
    }

    get formaPagamentoValue(): any {
        return {
            descricao: this.group.get('descricao')?.value
        } as any
    }

    get descricao(): string {
        return this.group.get('descricao')?.value;
    }

}