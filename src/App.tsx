import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Toaster } from '@/components/ui/sonner'
import WebhookForm from '@/components/forms/webhook/webhook-form'

function App() {
  return (
    <div>
      <main className="max-w-md m-auto mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Webhook</CardTitle>
            <CardDescription>set or get info for your bot</CardDescription>
          </CardHeader>
          <CardContent>
            <WebhookForm />
          </CardContent>
        </Card>
      </main>
      <Toaster theme="light" position="top-center" duration={12000} richColors />
    </div>
  )
}

export default App
