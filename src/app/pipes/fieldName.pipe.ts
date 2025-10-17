import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "fieldName"
})

export class FieldNamePipe implements PipeTransform {
    private fieldMap: { [key: string]: string } = {
        name: "Nome",
        age: "Idade",
        email: "Email",
        address: "Endereço",
        others: "Outros",
        interests: "Interesses",
        feelings: "Sentimentos",
        values: "Valores",
        isActive: "Status"
    };

    transform(value: string): string {
        return this.fieldMap[value] || value;
    }
}