import { Card, CardContent } from "@/components/ui/card"
import Deepseek from "./deepseek"
import WordList from "@/components/WordList"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold">LexiTale</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-8">
          <div className="mx-auto max-w-[90rem]">
            <h2 className="text-2xl font-bold mb-6">词汇列表</h2>
            <WordList />
          </div>
        </section>

        <section className="container space-y-6 py-8">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <Card className="w-full border-none shadow-none">
              <CardContent className="p-6">
                <Deepseek />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
