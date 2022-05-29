import { Box } from '@chakra-ui/react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'

export default function Video({ videoUrl }: { videoUrl: string }) {
  const isYoutubeUrl = videoUrl.indexOf('youtube') > 0
  return (
    <>
      {isYoutubeUrl ? (
        <LiteYouTubeEmbed
          id={videoUrl.split('v=')[1].slice(0, 11).trim()}
          title="Youtube Embedd"
        />
      ) : (
        <Box
          as="iframe"
          src={videoUrl}
          width="100%"
          allowFullScreen
          sx={{
            aspectRatio: '16/9',
          }}
        />
      )}
    </>
  )
}
