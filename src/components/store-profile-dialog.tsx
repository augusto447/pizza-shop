

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagedRestaurant, type GetManagerRestauranteResponse } from "@/api/get-manager-restaurant";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";


const StoreProfileShema = z.object({
    name: z.string().min(1),
    description: z.string().nullable(),

})

type StoreProfileShema = z.infer<typeof StoreProfileShema>


export function StoreProfileDialog() {

    const { data: manageRestaurant } =
        useQuery({
            queryKey: ["managed-restaurant"],
            queryFn: getManagedRestaurant,
            staleTime: Infinity,

        })

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<StoreProfileShema>({
        resolver: zodResolver(StoreProfileShema),
        values: {
            name: manageRestaurant?.name ?? "",
            description: manageRestaurant?.description ?? "",

        },
    })


    function updateManagedRestauarantCashe({ name, description }: StoreProfileShema) {
        const cashed = queryClient.getQueryData<GetManagerRestauranteResponse>(["managed-restaurant"])


        if (cashed) {
            queryClient.setQueryData<GetManagerRestauranteResponse>(["managed-restaurant"], {
                ...cashed,
                name,
                description,

            })

        }

        return { cashed }

    }

    const { mutateAsync: updateProfileFn } = useMutation({
        mutationFn: updateProfile,
        onMutate({ name, description }) {
            const { cashed } = updateManagedRestauarantCashe({ name, description })

            return { previousProfile: cashed }

        },


        onError(_, __, context) {

            if (context?.previousProfile) {
                updateManagedRestauarantCashe(context.previousProfile)
            }

        },
    })
    async function handleUpdateProfile(data: StoreProfileShema) {
        try {
            await updateProfileFn({
                name: data.name,
                description: data.description,
            })

            toast.success("Perfil actualizado com sucesso")
        } catch {
            toast.error("Falha ao actualizar o perfil,tente novamente")

        }

    }




    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Perfil da loja</DialogTitle>
                <DialogDescription>Atualiza as informações  do seu estabelecimento visíveis ao seu cliênte</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="name">Nome</Label>
                        <Input className="col-span-3" id="name"  {...register("name")}></Input>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="description">Descrição</Label>
                        <Textarea className="col-span-3" id="description" {...register("description")}></Textarea>
                    </div>

                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="ghost" type="button">Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" variant="sucess" disabled={isSubmitting}>Salvar</Button>
                </DialogFooter>
            </form>
        </DialogContent>


    )
}