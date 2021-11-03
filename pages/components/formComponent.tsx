import { Button } from '@material-ui/core';
import { FC } from 'react';
import Input from './Input'
import CheckBox from './checkbox';

interface FormField {
    name: string
    type: string
}

interface FormPageProps {
    formData: string[] | FormField[]
    userInputData: { [key: string]: string }
    onChangeHandler: (id: string, value: string | boolean) => void
    submitHandler: (event: any) => void
}

const generateFormData = (formData: string[] | FormField[] = []) => {
    return formData.map((field: string | FormField) => {
        if (typeof field === 'string') {
            return {
                name: field,
                type: 'text'
            }
        }
        return field
    })
}

const Form: FC<FormPageProps> = (props) => {
    const { formData, userInputData, submitHandler, onChangeHandler } = props
    const generatedFieldData = generateFormData(formData)

    return <form onSubmit={submitHandler} style={{backgroundColor: 'beige'}}>
        {generatedFieldData.map(field => {
            switch (field.type) {
                case 'checkbox': {
                    return <CheckBox {...field} onChange={onChangeHandler} />
                }
                default: {
                    return <Input {...field} value={userInputData[field.name]} onChange={onChangeHandler} />
                }
            }
        })}
        <Button variant="contained" type="submit" style={{margin: 20}}>Submit</Button>
    </form>
};

export default Form;
