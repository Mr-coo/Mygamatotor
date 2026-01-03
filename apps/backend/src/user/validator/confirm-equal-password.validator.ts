import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ name: 'passwordMatch', async: false })
export class ConfirmEqualPassword implements ValidatorConstraintInterface{
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        if(validationArguments == null) return false;
        const obj = validationArguments.object as any;
        return obj.password == obj.confirm;
    }
    defaultMessage(): string {
        return 'Confrim password do not match password';
    }
}