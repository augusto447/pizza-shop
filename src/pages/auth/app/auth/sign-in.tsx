import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { SignInRequest } from "@/api/sign-in";


const SignInForm = z.object({
  email: z.string().email(),
});

type SignFormData = z.infer<typeof SignInForm>;

export function SignIn() {

  const [searchParams] = useSearchParams()






  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignFormData>(
    {
      defaultValues: {
        email: searchParams.get("email") ?? "",

      }

    }
  );

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: SignInRequest,
  })


  async function handleSignIn(data: SignFormData) {
    try {


      await authenticate({ email: data.email })

      toast.success("Enviamos um link de autenticação para seu e-mail.", {
        action: {
          label: "Reenviar",
          onClick: () => handleSignIn(data),
        },
      });
    } catch (error) {
      toast.error("Credenciais inválidas. Tente novamente.");
    }
  }
  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild>
          <Link to="/sign-up" className="absolute top-8 right-4">
            Novo estabelecimento
          </Link>
        </Button>
        <div className="W-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-muted-foreground text-sm">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>
            <Button
              disabled={isSubmitting}
              className="w-full cursor-pointer"
              type="submit"
            >
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
