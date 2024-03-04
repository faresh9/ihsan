import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const token = process.env.REACT_APP_SANITY_TOKEN;
//const projectId = process.env.REACT_APP_SANITY_PROJECT_ID;

export const client = createClient({
  projectId: 'fzdbee7y',
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
  token: token,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);