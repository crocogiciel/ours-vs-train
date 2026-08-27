import { AnswerForm } from "@/components/AnswerForm";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Quelle est la différence entre un ours et un train ?
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Une seule réponse suffit. Notre institut scientifique fictif calcule le reste.
        </p>
      </div>
      <AnswerForm />
    </div>
  );
}
