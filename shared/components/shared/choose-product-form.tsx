import React from "react";
import { cn } from "@/shared/lib/utils";
import { Title } from "./title";
import { Button } from "../ui/button";
import Image from "next/image";

type Props = {
  className?: string;
  imageUrl: string;
  name: string;
  onSubmit?: VoidFunction;
  price: number;
  loading?: boolean;
};

const ChooseProductForm = ({
  name,
  imageUrl,
  onSubmit,
  className,
  price,
  loading,
}: Props) => {
  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <Image
          src={imageUrl}
          alt={name}
          width={250}
          height={250}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px] "
        />
      </div>
      <div className="w-[490px] bh=[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <Button
          onClick={() => onSubmit?.()}
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
        >
          Добавить в корзину за {price}
        </Button>
      </div>
    </div>
  );
};

export default ChooseProductForm;
