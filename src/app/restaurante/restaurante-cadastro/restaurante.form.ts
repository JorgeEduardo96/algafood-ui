import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable()
export class RestauranteForm {
    group: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.group = formBuilder.group({
            nome: formBuilder.control(null, [Validators.required]),
            taxaFrete: formBuilder.control(null, [Validators.required]),
            cozinha: formBuilder.control(undefined, [Validators.required]),
            endereco: formBuilder.group({
                cep: [null, Validators.required],
                logradouro: [null, Validators.required],
                numero: [null, Validators.required],
                complemento: [null],
                bairro: [null, Validators.required],
                cidade: formBuilder.control(undefined, [Validators.required])
              }),
        })
    }

    reset() {
        this.group?.reset();
    }

    init(restaurante: any) {
        this.group?.patchValue({
            nome: restaurante.nome,
            taxaFrete: restaurante.taxaFrete,
            cozinha: restaurante.cozinha.id,
            endereco: {
                logradouro: restaurante.endereco?.logradouro,
                cidade: restaurante.endereco?.cidade.id,
                complemento: restaurante.endereco?.complemento,
                numero: restaurante.endereco?.numero,
                cep: restaurante.endereco?.cep,
                bairro: restaurante.endereco?.bairro
            }
        })
    }

    get restauranteValue(): any {
        return {
            nome: this.group.get('nome')?.value,
            taxaFrete: this.group.get('taxaFrete')?.value,
            cozinha: {
                id: this.group.get('cozinha')?.value
            },
            endereco: {
                logradouro: this.group.get('endereco')?.get('logradouro')?.value,
                cep: this.group.get('endereco')?.get('cep')?.value,
                bairro: this.group.get('endereco')?.get('bairro')?.value,
                numero: this.group.get('endereco')?.get('numero')?.value,
                cidade: {
                    id: this.group.get('endereco')?.get('cidade')?.value,
                },
                complemento: this.group.get('endereco')?.get('complemento')?.value
            }
        } as any
    }

    get nome(): string {
        return this.group.get('nome')?.value;
    }

    get endereco(): any {
        return this.group.get('endereco')
    }

}