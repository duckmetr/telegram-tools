import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { formSchema, type FormValues } from './schema'
import { toast } from 'sonner'

type TMethod = {
  token: string
  domain?: string
  path?: string
}

const methods = [
  {
    id: 'setWebhook',
    title: 'Set webhook',
    endpoint({ token, domain, path }: TMethod) {
      return `https://api.telegram.org/bot${token}/${this.id}?url=${domain}/${path}`
    }
  },
  {
    id: 'getWebhookInfo',
    title: 'Webhook info',
    endpoint({ token }: TMethod) {
      return `https://api.telegram.org/bot${token}/${this.id}`
    }
  },
  {
    id: 'getMe',
    title: 'Bot info',
    endpoint({ token }: TMethod) {
      return `https://api.telegram.org/bot${token}/${this.id}`
    }
  }
]

function WebhookForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: '',
      token: '',
      domain: '',
      path: ''
    }
  })

  async function onSubmit(values: FormValues) {
    const method = methods.find(({ title }) => title === values.method)
    const endpoint = method.endpoint({ ...values })

    console.log('2')

    try {
      const res = await fetch(endpoint)
      const data = await res.json()
      if (data.ok) {
        toast(<pre>{JSON.stringify(data.result, null, 2)}</pre>)
      } else {
        toast.warning(JSON.stringify(data, null, 2))
      }
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {methods.map(({ title }) => (
                    <SelectItem value={title} key={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select submit method</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token</FormLabel>
              <FormControl>
                <Input placeholder="1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ" {...field} />
              </FormControl>
              <FormDescription>This is your token</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>This is your domain</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Path</FormLabel>
              <FormControl>
                <Input placeholder="abcdefghijklmnopqrstuvwxyz" {...field} />
              </FormControl>
              <FormDescription>This is your path</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default WebhookForm
