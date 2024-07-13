import { useForm } from "react-hook-form";
import {
  Button,
  ErrorMessage,
  Fieldset,
  Form,
  FormContainer,
  Input,
  Label,
  Titulo,
} from "../../components";

interface FormInputEndereco {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  localidade: string;
}

const CadastroEndereco = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInputEndereco>()

  const cepDigitado = watch('cep')

  const fetchEndereco = async (cep: string) => {
    if (!cep) {
      setError("cep", {
        type: "manual",
        message: "Cep inválido",
      });

      return
    }

    try {
      const response = await fetch(`http://viacep.com.br/ws/${cep}/json/`)
      const data = await response.json()

      if (response.ok) {
        setValue("rua", data.logradouro)
        setValue("localidade", `${data.localidade}, ${data.uf}`);
        setValue("bairro", data.bairro);
      } else {
        throw new Error("Cep inválido");
      }

      console.log(data)
    } catch (error) {
      console.log(error)
    }

  }

  const onSubmitForm = (data: FormInputEndereco) => {
    console.log(data)
  }

  return (
    <>
      <Titulo>Agora, mais alguns dados sobre você:</Titulo>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Fieldset>
          <Label htmlFor="campo-cep">CEP</Label>
          <Input
            id="campo-cep"
            placeholder="Insira seu CEP"
            type="text"
            {...register("cep")}
            onBlur={() => fetchEndereco(cepDigitado)}
          />
          {errors.cep && 
            <ErrorMessage>
              {errors.cep.message}
            </ErrorMessage>
          }
        </Fieldset>
        <Fieldset>
          <Label htmlFor="campo-rua">Rua</Label>
          <Input
            id="campo-rua"
            placeholder="Rua Agarikov"
            type="text"
            {...register("rua")}
          />
        </Fieldset>

        <FormContainer>
          <Fieldset>
            <Label htmlFor="campo-numero-rua">Número</Label>
            <Input
              id="campo-numero-rua"
              placeholder="Ex: 1440"
              type="text"
              {...register("numero")}
            />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="campo-bairro">Bairro</Label>
            <Input
              id="campo-bairro"
              placeholder="Vila Mariana"
              type="text"
              {...register("bairro")}
            />
          </Fieldset>
        </FormContainer>
        <Fieldset>
          <Label htmlFor="campo-localidade">Localidade</Label>
          <Input
            id="campo-localidade"
            placeholder="São Paulo, SP"
            type="text"
            {...register("localidade")}
          />
        </Fieldset>
        <Button type="submit">Cadastrar</Button>
      </Form>
    </>
  );
};

export default CadastroEndereco;
