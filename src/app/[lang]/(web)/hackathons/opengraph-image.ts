import { getOgImage } from '@/components/og/response';
import { config } from '@/utils/og';


export const dynamic = 'force-static';
export const size = {
  width: config.size.width,
  height: config.size.height,
};
export const contentType = config.contentType;

export default async function Image() {
  return getOgImage('hackathons');
}
