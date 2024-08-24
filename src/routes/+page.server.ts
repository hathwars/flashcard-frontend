import { error } from '@sveltejs/kit'
import { put } from '@vercel/blob'
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'

export const actions = {
  upload: async ({ request }) => {
    const form = await request.formData()
    const file = form.get('pdf-upload') as File

    console.log("Form:", form);
    console.log(`File size: ${file.size} bytes`);
    console.log("File:", file);
    
    if (!file) {
      error(400, { message: 'No file to upload.' })
    }

    const { url } = await put(file.name, file, {
      access: 'public',
      token: BLOB_READ_WRITE_TOKEN,
    })
    return { uploaded: url }
  },
}
