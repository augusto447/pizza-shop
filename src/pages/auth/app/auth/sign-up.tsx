import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { RegisterRestaurant } from "@/api/register-restaurant";

const SignUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignFormData = z.infer<typeof SignUpForm>;

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignFormData>();


  const { mutateAsync: RegisterRestaurantFn } = useMutation({
    mutationFn: RegisterRestaurant
  })

  async function handleSignUp(data: SignFormData) {
    try {
      console.log(data);

      await RegisterRestaurantFn({
        restaurantName: data.restaurantName,
        managerName: data.managerName,
        email: data.email,
        phone: data.phone
      })

      toast.success("Restaurante cadastrado com sucesso.", {
        action: {
          label: "Login",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch (error) {
      toast.error("Erro ao cadastrar restaurante. Tente novamente.");
    }
  }
  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild>
          <Link to="/sign-in" className="absolute top-8 right-4">
            Fazer login
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-muted-foreground text-sm">
              Seja um parceiro e começa as suas vendas
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restauranteName">Nome do estabelecimento</Label>
              <Input
                id="restauranteName"
                type="text"
                {...register("restaurantName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu Nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu Celular</Label>
              <Input id="phone" type="tel" {...register("phone")} />
            </div>
            <Button
              disabled={isSubmitting}
              className="w-full cursor-pointer"
              type="submit"
            >
              Finalizar Cadastro
            </Button>
            <p className="text-muted-foreground px-6 text-center text-sm leading-relaxed">
              Ao continuar, voçê concorda com os nossos{" "}
              <a className="underlineffeset-4 underline">termos de serviços</a>{" "}
              e{" "}
              <a className="underlineffeset-4 underline">
                políticas de privacidade.
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
