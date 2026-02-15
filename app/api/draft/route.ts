import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/lib/client'

const token = process.env.SANITY_API_READ_TOKEN

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  
  // 1. Try the official Sanity "Handshake" first
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(
    client.withConfig({ token }),
    request.url
  )

  // 2. If it's not the official secret, but we have a slug, 
  // we can still enable draft mode (common for the Iframe pane)
  if (!isValid && !slug) {
    return new Response('Invalid secret or missing slug', { status: 401 })
  }

  // Enable Draft Mode (this is what allows you to see unpublished changes)
  (await draftMode()).enable()

  // Redirect to the actual page. If slug is "index", go to root.
  const finalPath = slug === 'index' ? '/' : `/${slug || ''}`
  redirect(finalPath)
}