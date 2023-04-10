import { Box, Text } from '@zoralabs/zord'

interface SectionProps {
  title: string
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <>
      <Text variant="heading-xs" mt="x10">
        {title}
      </Text>
      <Box
        borderColor="border"
        borderStyle="solid"
        borderWidth="normal"
        borderRadius="curved"
        color="text3"
        px="x6"
        py="x4"
        mt="x6"
      >
        {children}
      </Box>
    </>
  )
}
